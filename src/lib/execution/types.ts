export type ExecutionLog = {
    nodeId: string;
    message: string;
    timestamp: number;
};

export type ExecutionContext = {
    executionId: string;
    // Map of Node ID to their output results
    // This allows downstream nodes to look up upstream results
    nodeResults: Map<string, Record<string, unknown>>;

    // Execution logs for debugging
    logs: ExecutionLog[];

    // Helper to log messages
    log: (nodeId: string, message: string) => void;
};

export interface ExecutableNode<I = Record<string, unknown>, O = Record<string, unknown>> {
    // The execute method is proper pure function (mostly)
    // It takes inputs and context, returns a Promise of output
    execute(input: I, context: ExecutionContext): Promise<O>;
}
