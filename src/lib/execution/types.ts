export type ExecutionContext = {
    // Dictionary for storing variable values, inputs, execution state
    variables: Record<string, unknown>;

    // Helper to log messages during execution (for debugging)
    log: (nodeId: string, message: string) => void;
};

export interface ExecutableNode<I = Record<string, unknown>, O = Record<string, unknown>> {
    // The execute method is proper pure function (mostly)
    // It takes inputs and context, returns a Promise of output
    execute(input: I, context: ExecutionContext): Promise<O>;
}
