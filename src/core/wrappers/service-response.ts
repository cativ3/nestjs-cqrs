export class ServiceResponse<T = void> {
    success: boolean = true;
    message: string = null;
    data: T = null;
}