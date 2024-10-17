import pino from 'pino';
import { Response } from 'express';
import { AppError } from './AppError';
import { disconnect } from '../../db/disconnect';
import { commonTypes } from '../../constants/Errors/comonTypes';

class ErrorHandler {
    /**
     * This Function help us to centralize error handling
     * @param error Object of the error throwed
     * @param responseStream response Object from express
     */
    public async handleError(
        error: AppError,
        responseStream: Response,
    ): Promise<void> {
        this.logger.error(error, 'Whoops !');
        await this.crashIfBadError(error, responseStream);
        responseStream.status(commonTypes[error.commonType]).json({
            msg: error.message,
        });

    }

    private logger = pino();

    private async crashIfBadError(error: AppError, responseStream: Response) {
        if (error.isOperational) return;
        await disconnect();
        process.exit(1);
    }
}

export const errorHandler = new ErrorHandler();
