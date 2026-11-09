export type StracturedId = {
    type: 'scenalio' | 'state';
    value: any
}

export type StateLoader = {
    load: (id) => Promise<any> | any
}

export type ScenarioLoader = {
    load: (id) => Promise<any> | any
}
