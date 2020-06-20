import { Client } from '@line/bot-sdk'
import { lineConfig } from './secrets/line'

export const client = new Client(lineConfig)