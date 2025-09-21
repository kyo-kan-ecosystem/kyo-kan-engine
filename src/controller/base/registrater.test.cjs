const { expect } = require('chai');
const sinon = require('sinon');
const { Registrater } = require('./registrater.cjs');
const { ContextBuilder } = require('./context_builder.cjs');

describe('Registrater', () => {
    let registrater;
    let mockContext;
    let contextBuilderStub;

    beforeEach(() => {
        // Mock the context object that Registrater will build
        mockContext = {
            repositries: {
                plugins: {
                    executors: new Map(),
                    workflows: new Map(),
                },
                configures: {
                    engine: {
                        update: sinon.spy(),
                        get: sinon.stub(),
                    },
                    workflows: {
                        set: sinon.spy(),
                        get: sinon.stub(),
                        add: sinon.stub(),
                    },
                    executors: {
                        add: sinon.stub(),
                    },
                },
            },
        };

        // Stub the _buildContext method of ContextBuilder to return the mock context
        contextBuilderStub = sinon.stub(ContextBuilder.prototype, '_buildContext').returns(mockContext);

        // Instantiate Registrater. The constructor will use the stubbed method.
        registrater = new Registrater({}, null);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should be an instance of ContextBuilder', () => {
        expect(registrater).to.be.an.instanceof(ContextBuilder);
    });

    describe('constructor', () => {
        it('should build the context on instantiation', () => {
            // This is already done in the beforeEach hook, so just assert
            expect(contextBuilderStub.calledOnce).to.be.true;
            expect(registrater.context).to.deep.equal(mockContext);
        });

        it("should pass the 'contextInit' argument to the '_buildContext' method", () => {
            // The constructor is called in `beforeEach` with `{}` as contextInit.
            // This test verifies that the stub was called with that specific argument.
            expect(contextBuilderStub.calledOnceWith({})).to.be.true;
        });
    });

    describe('registerExecutorPlugin', () => {
        it('should register an executor plugin', () => {
            const pluginName = 'my-executor';
            const plugin = { name: 'MyExecutorPlugin' };
            registrater.registerExecutorPlugin(pluginName, plugin);
            expect(registrater.context.repositries.plugins.executors.get(pluginName)).to.equal(plugin);
        });
    });

    describe('registerWorkflowPlugin', () => {
        it('should register a workflow plugin', () => {
            const pluginName = 'my-workflow';
            const plugin = { name: 'MyWorkflowPlugin' };
            registrater.registerWorkflowPlugin(pluginName, plugin);
            expect(registrater.context.repositries.plugins.workflows.get(pluginName)).to.equal(plugin);
        });
    });

    describe('setEngineConfigue', () => {
        it('should update the engine configuration', () => {
            const configValues = { timeout: 5000 };
            registrater.setEngineConfigue(configValues);
            expect(mockContext.repositries.configures.engine.update.calledOnceWith(configValues)).to.be.true;
        });
    });

    describe('parseConfigure', () => {
        it('should parse a complex configuration and populate repositories', () => {
            // --- Setup mocks and stubs ---

            // 1. Engine Configure
            const mockEngineConfigure = {
                root: {
                    workflow: {
                        plugin: 'root-workflow-plugin',
                        id: 'root-workflow'
                    }
                }
            };
            mockContext.repositries.configures.engine.get.returns(mockEngineConfigure);

            // 2. Plugins
            const mockRootWorkflowPlugin = {
                getConfigureParams: sinon.stub(),
                addExecutor: sinon.spy(),
            };
            const mockSubWorkflowPlugin = {
                getConfigureParams: sinon.stub(),
                addExecutor: sinon.spy(),
            };
            const mockExecutorPlugin = {
                getSubworkflows: sinon.stub().returns({
                    'sub1': { plugin: 'sub-workflow-plugin' }
                }),
            };

            registrater.context.repositries.plugins.workflows.set('root-workflow-plugin', mockRootWorkflowPlugin);
            registrater.context.repositries.plugins.workflows.set('sub-workflow-plugin', mockSubWorkflowPlugin);
            registrater.context.repositries.plugins.executors.set('executor-plugin', mockExecutorPlugin);

            // 3. Input Configuration
            const inputConfigure = { entry: 'main.js' };
            const executorConfig1 = {
                plugin: 'executor-plugin',
                params: { p1: 'v1' },
                subworkflows: { sub1: { params: { p2: 'v2' } } }
            };
            const rootWorkflowParams = { plugin: 'root-workflow-plugin' };

            // 4. Stub return values
            mockRootWorkflowPlugin.getConfigureParams.withArgs(inputConfigure).returns({
                params: rootWorkflowParams,
                executors: [executorConfig1]
            });

            const rootWorkflowConfigure = { plugin: 'root-workflow-plugin' };
            mockContext.repositries.configures.workflows.get.withArgs('root-workflow').returns(rootWorkflowConfigure);
            mockContext.repositries.configures.executors.add.withArgs(executorConfig1).returns('executor-1-id');

            const subWorkflowConfigureParams = { plugin: 'sub-workflow-plugin' };
            mockSubWorkflowPlugin.getConfigureParams.withArgs({ p2: 'v2' }, 'executor-1-id').returns({
                params: subWorkflowConfigureParams,
                executors: []
            });

            mockContext.repositries.configures.workflows.add.withArgs('executor-1-id', 'sub1', subWorkflowConfigureParams).returns('subworkflow-1-id');

            // --- Execute ---
            registrater.parseConfigure(inputConfigure);

            // --- Assert ---
            expect(mockContext.repositries.configures.engine.get.calledOnce).to.be.true;
            expect(mockRootWorkflowPlugin.getConfigureParams.calledOnceWith(inputConfigure)).to.be.true;
            expect(mockContext.repositries.configures.workflows.set.calledOnceWith('root-workflow', rootWorkflowParams)).to.be.true;
            expect(mockContext.repositries.configures.workflows.get.calledWith('root-workflow')).to.be.true;
            expect(mockContext.repositries.configures.executors.add.calledOnceWith(executorConfig1)).to.be.true;
            expect(mockRootWorkflowPlugin.addExecutor.calledOnceWith(rootWorkflowConfigure, 'executor-1-id')).to.be.true;
            expect(mockContext.repositries.plugins.executors.get.calledOnceWith('executor-plugin')).to.be.true;
            expect(mockExecutorPlugin.getSubworkflows.calledOnce).to.be.true;
            expect(mockSubWorkflowPlugin.getConfigureParams.calledOnceWith({ p2: 'v2' }, 'executor-1-id')).to.be.true;
            expect(mockContext.repositries.configures.workflows.add.calledOnceWith('executor-1-id', 'sub1', subWorkflowConfigureParams)).to.be.true;
        });

        it('should handle nested executors in sub-workflows', () => {
            // --- Setup mocks and stubs ---
            const mockEngineConfigure = { root: { workflow: { plugin: 'root-workflow-plugin', id: 'root-workflow' } } };
            mockContext.repositries.configures.engine.get.returns(mockEngineConfigure);

            const mockRootWorkflowPlugin = { getConfigureParams: sinon.stub(), addExecutor: sinon.spy() };
            const mockSubWorkflowPlugin = { getConfigureParams: sinon.stub(), addExecutor: sinon.spy() };
            const mockExecutorPlugin1 = { getSubworkflows: sinon.stub().returns({ 'sub1': { plugin: 'sub-workflow-plugin' } }) };
            const mockExecutorPlugin2 = { getSubworkflows: sinon.stub().returns({}) };

            registrater.context.repositries.plugins.workflows.set('root-workflow-plugin', mockRootWorkflowPlugin);
            registrater.context.repositries.plugins.workflows.set('sub-workflow-plugin', mockSubWorkflowPlugin);
            registrater.context.repositries.plugins.executors.set('executor-plugin-1', mockExecutorPlugin1);
            registrater.context.repositries.plugins.executors.set('executor-plugin-2', mockExecutorPlugin2);

            const executorConfig1 = { plugin: 'executor-plugin-1', subworkflows: { sub1: { params: {} } } };
            const executorConfig2 = { plugin: 'executor-plugin-2' };

            mockRootWorkflowPlugin.getConfigureParams.returns({ params: {}, executors: [executorConfig1] });
            mockSubWorkflowPlugin.getConfigureParams.returns({ params: {}, executors: [executorConfig2] });

            const rootWorkflowConfigure = { plugin: 'root-workflow-plugin' };
            const subWorkflowConfigure = { plugin: 'sub-workflow-plugin' };
            mockContext.repositries.configures.workflows.get.withArgs('root-workflow').returns(rootWorkflowConfigure);
            mockContext.repositries.configures.workflows.get.withArgs('subworkflow-1-id').returns(subWorkflowConfigure);
            mockContext.repositries.configures.executors.add.withArgs(executorConfig1).returns('executor-1-id');
            mockContext.repositries.configures.executors.add.withArgs(executorConfig2).returns('executor-2-id');
            mockContext.repositries.configures.workflows.add.returns('subworkflow-1-id');

            // --- Execute ---
            registrater.parseConfigure({});

            // --- Assert ---
            expect(mockContext.repositries.configures.executors.add.callCount).to.equal(2);
            expect(mockContext.repositries.configures.executors.add.calledWith(executorConfig1)).to.be.true;
            expect(mockContext.repositries.configures.executors.add.calledWith(executorConfig2)).to.be.true;
            expect(mockRootWorkflowPlugin.addExecutor.calledOnceWith(rootWorkflowConfigure, 'executor-1-id')).to.be.true;
            expect(mockSubWorkflowPlugin.addExecutor.calledOnceWith(subWorkflowConfigure, 'executor-2-id')).to.be.true;
        });
    });
});
