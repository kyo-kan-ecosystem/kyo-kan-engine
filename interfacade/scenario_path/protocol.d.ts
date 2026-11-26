export type DefaultRootType = 'workflows' | 'executors' | 'root' | 'boots'

export type ScenarioPath<RootType = DefaultRootType> {
    root: RootType;
    expressions: Array<number | string>;

}

export type WithScenarioPath<RootType = DefaultRootType> {
    scenarioPath: ScenarioPath<RootType>
}

