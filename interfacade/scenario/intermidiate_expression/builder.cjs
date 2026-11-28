const { ResolverParseContextBuildeClass } = require("../../../src/resolver/interfacade/parse_context.cjs")
const { PluginBundleBuilder } = require("../plugins/bundle/builder.cjs")
const { ScenarioIntermidiateExpression } = require("./class.cjs")

const DEFAULT_RESOLVER_PARSE_CONTEXT_BUILDER = new ResolverParseContextBuildeClass()
const DEFAULT_PLUGIN_BUNDLE_BUILDER = new PluginBundleBuilder()

class ScenarioIntermidiateExpressionBuilder {
    constructor(buildTarget = ScenarioIntermidiateExpression, pluginBundleBuilder = DEFAULT_PLUGIN_BUNDLE_BUILDER, resolverParseContextBuilder = DEFAULT_RESOLVER_PARSE_CONTEXT_BUILDER) {
        this.pluginBundleBuilder = pluginBundleBuilder
        this.resolverParseContextBuilder = resolverParseContextBuilder
        this.buildTarget = buildTarget
    }
    /**
     * 
     * @param {import('../class.cjs').Scenario} scenario 
     */
    async build(scenario) {
        const pluginBundle = await this.pluginBundleBuilder.build(scenario.pluginPacks)
        const { root, boots, executors, workflows } = scenario

        const plugins = await pluginBundle.getWorkflowAndExecutorPlugins()
        const resolver = this.resolverParseContextBuilder.build({ workflowPlugins: plugins.workflows, executorPlugins: plugins.executors })
        resolver.setRootWorkflow(root)

        resolver.pushBootExecutors(boots)
        for (const id in executors) {


            const configure = executors[id];
            resolver.pushNamedExecutor(id, configure)

        }

        for (const id in workflows) {


            const configure = workflows[id];
            resolver.pushNamedWorkflow(id, configure)

        }
        resolver.parseReadable()
        const datas = resolver.context.getImutableData()
        return new this.buildTarget({ executors, workflows, boots, root, pluginBundle, datas })








    }

}

module.exports = { ScenarioIntermidiateExpressionBuilder }