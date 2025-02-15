class ApiResponse {
    constructor(
        public success: boolean,
        public message: string,
        public data ?: any
    ) {}
}

export default ApiResponse;
