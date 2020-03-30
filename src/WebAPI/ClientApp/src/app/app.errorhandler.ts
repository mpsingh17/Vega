import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.log("Something went wrong", error);
    }
}