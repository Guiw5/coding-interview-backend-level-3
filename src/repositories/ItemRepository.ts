import { Item } from '../entities/Item'
import type { Repository } from 'typeorm'
export type ItemRepository = Repository<Item>