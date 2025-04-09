
import pino from 'hapi-pino'
import type { Request, Server } from '@hapi/hapi'

const isTest = process.env.NODE_ENV === 'test'
export const useLogger = async (server: Server) => {
    await server.register({
        plugin: pino,
        options: {
            level: 'info',
            logPayload: true,
            logPathParams: true,
            logQueryParams: true,
            logRequestStart: !isTest,
            logRequestComplete: !isTest,
            log4xxResponseErrors: !isTest,
            mergeHapiLogData: true,
            logEvents: ['onPostStart', 'onPostStop', 'response', 'request-error'],
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                    messageFormat: '{msg}',
                    colorizeObjects: true
                },
                dedupe: true
            },
            customRequestStartMessage: function (req: Request) {
                return `${req.method.toUpperCase()} ${req.path} Request`
            },
            customRequestCompleteMessage: function (req: Request) {
                return `${req.method.toUpperCase()} ${req.path} Response`
            },
            customRequestErrorMessage: function (req: Request, err: Error) {
                return `${req.method.toUpperCase()} ${req.path} - ${err.message}`
            },
        }
    })
}