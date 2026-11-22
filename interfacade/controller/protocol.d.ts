export type StracturedId = {
    type: 'scenalio' | 'state';
    value: any
}

export type ContextStore = {
    get: (id) => Promise<any> | any
}

export type ScenarioLoader = {
    load: (id) => Promise<any> | any
}
