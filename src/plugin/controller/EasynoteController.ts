import EasyNote from './../../entity/EasyNote';
import { AppDataSource } from '../../connection'



exports.plugin = {
    name: 'EasynoteController',
    once: true,
    register: (server, options) => {
        server.app.EasynoteController = class EasynoteController {
            async getNote(): Promise<Object> {
                const noteRepository = AppDataSource.getRepository(EasyNote)
                const allNote = await noteRepository.find()
                return allNote
            }

            async findNote(req):Promise<Object> {
                const noteRepository = AppDataSource.getRepository(EasyNote)
                const builder = noteRepository.createQueryBuilder('EasyNote');

                if(req.query.find){
                    builder.where('EasyNote.note LIKE :find',{find :`%${req.query.find}%`})
                }

                const page:number = parseInt(req.query.page) || 1
                const perPage = 2
                const total = await builder.getCount()

                builder.offset((page - 1) * perPage).limit(perPage)

                const response = {
                    data : await builder.getMany(),
                    total,
                    page,
                    last_page: Math.ceil(total/perPage)
                }
                return response
                
            }

            async writeNote(req):Promise<Object>{
                const noteRepository = AppDataSource.getRepository(EasyNote)
                const find = await noteRepository.findOne({where : {note : req.payload.note}})
                const noteData = {
                    note : req.payload.note,
                    customer : req.payload.customer,
                    history_note : req.payload.history_note,
                    category_note : req.payload.category_note
                }
                if(!find){
                    noteRepository.save(<EasyNote>noteData)
                    return 'Save completed'
                }
                else{
                    return 'Please change your name note'
                }
                
            }
        }
    }
}