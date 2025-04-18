import { ItemController } from '../controllers/ItemController'
import { Request } from '@hapi/hapi'

describe('ItemController', () => {
    let controller: ItemController
    let mockRepository: any
    let mockResponseToolkit: any

    beforeEach(() => {
        jest.clearAllMocks()

        mockRepository = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn()
        }

        mockResponseToolkit = {
            response: jest.fn().mockReturnThis(),
            code: jest.fn().mockReturnThis()
        }

        controller = new ItemController(mockRepository)
    })

    describe('list', () => {
        it('should return all items', async () => {
            const mockItems = [{ id: 1, name: 'Test', price: 100 }]
            mockRepository.find.mockResolvedValue(mockItems)

            const result = await controller.list({} as Request, mockResponseToolkit)

            expect(mockRepository.find).toHaveBeenCalled()
            expect(mockResponseToolkit.response).toHaveBeenCalledWith(mockItems)
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(200)
            expect(result).toBeDefined()
        })
    })

    describe('get', () => {
        it('should return item when found', async () => {
            const mockItem = { id: 1, name: 'Test', price: 100 }
            mockRepository.findOneBy.mockResolvedValue(mockItem)
            const params = { id: '1' } as unknown;

            const result = await controller.get({ params } as Request, mockResponseToolkit)

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
            expect(mockResponseToolkit.response).toHaveBeenCalledWith(mockItem)
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(200)
            expect(result).toBeDefined()
        })

        it('should return 404 when item not found', async () => {
            mockRepository.findOneBy.mockResolvedValue(null)
            const params = { id: '1' } as unknown;

            const result = await controller.get({ params } as Request, mockResponseToolkit)

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
            expect(mockResponseToolkit.response).toHaveBeenCalledWith({ message: 'Item not found' })
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(404)
            expect(result).toBeDefined()
        })
    })

    describe('create', () => {
        it('should create item with valid data', async () => {
            const payload = { name: 'Test', price: 100 }
            const mockItem = { id: 1, ...payload }
            mockRepository.create.mockReturnValue(mockItem)
            mockRepository.save.mockResolvedValue(mockItem)

            const result = await controller.create({ payload } as Request, mockResponseToolkit)

            expect(mockRepository.create).toHaveBeenCalledWith(payload)
            expect(mockRepository.save).toHaveBeenCalled()
            expect(mockResponseToolkit.response).toHaveBeenCalledWith(mockItem)
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(201)
            expect(result).toBeDefined()
        })
    })

    describe('update', () => {
        it('should update item with valid data', async () => {
            const params = { id: '1' } as unknown;
            const payload = { name: 'Test', price: 120 }
            const mockItem = { id: 1, name: 'Test1', price: 100 }
            const updatedItem = {...mockItem, ...payload}
            mockRepository.findOneBy.mockResolvedValue(mockItem)
            mockRepository.merge.mockReturnValue(updatedItem)
            mockRepository.save.mockResolvedValue(updatedItem)
            
            const result = await controller.update({ params, payload } as Request, mockResponseToolkit)

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
            expect(mockRepository.merge).toHaveBeenCalledWith(mockItem, payload)
            expect(mockRepository.save).toHaveBeenCalled()
            expect(mockResponseToolkit.response).toHaveBeenCalledWith(updatedItem)
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(200)
            expect(result).toBeDefined()
        })

        it('should return 404 when item not found', async () => {
            const params = { id: '1' } as unknown;
            const payload = { name: 'Update', price: 25 }
            mockRepository.findOneBy.mockResolvedValue(null)

            const result = await controller.update({ params, payload } as Request, mockResponseToolkit)

            expect(mockRepository.merge).not.toHaveBeenCalled()
            expect(mockRepository.save).not.toHaveBeenCalled()
            expect(mockResponseToolkit.response).toHaveBeenCalledWith({ message: 'Item not found' })
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(404)
            expect(result).toBeDefined()
        })
    })

    describe('delete', () => {  
        it('should delete item when found', async () => {
            const params = { id: '1' } as unknown;
            const mockItem = { id: 1, name: 'Test1', price: 25 }
            mockRepository.findOneBy.mockResolvedValue(mockItem)
            mockRepository.remove.mockResolvedValue(mockItem)

            const result = await controller.delete({ params } as Request, mockResponseToolkit)

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
            expect(mockRepository.remove).toHaveBeenCalled()
            expect(mockResponseToolkit.response).toHaveBeenCalledWith()
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(204)
            expect(result).toBeDefined()
        })

        it('should return 404 when item not found', async () => {
            const params = { id: '1' } as unknown;
            mockRepository.findOneBy.mockResolvedValue(null)

            const result = await controller.delete({ params } as Request, mockResponseToolkit)

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
            expect(mockRepository.remove).not.toHaveBeenCalled()
            expect(mockResponseToolkit.response).toHaveBeenCalledWith({ message: 'Item not found' })
            expect(mockResponseToolkit.code).toHaveBeenCalledWith(404)
            expect(result).toBeDefined()
        })
    })
}) 