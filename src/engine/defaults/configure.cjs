/**
 * @type {import("../repositry/protocol").EngineConfigure}
 */
const DEFAULT_ENGINE_CONFIGURE = {
    root: {
        workflow: {
            plugin: 'step',
            id: ''
        }
    },
    executor: {
        enterFunc: 'enter'
    },
    sequence: {
        start: 'start',
        resume: 'resume'
    },
    boot: {
        callback: 'boot'
    }
};
module.exports = { DEFAULT_ENGINE_CONFIGURE }