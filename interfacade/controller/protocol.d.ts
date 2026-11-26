
export interface ContextStore = {
    get: (id) => Promise<any> | any
    set: (id, context) => Promise<any> | any
}

export type ScenarioLoader = {
    load: (id) => Promise<any> | any
}
