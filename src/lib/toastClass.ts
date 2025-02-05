type Variant = "default" | "destructive";

class Toast {
    constructor(
        public title: string,
        public description: string,
        public variant: Variant = "default"
    ) {}
}

export default Toast;
