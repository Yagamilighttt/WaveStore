import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Device, DeviceInfo } from '../models/models.js';
import ApiError from "../error/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DeviceControllerClass {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files
            let filename = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            
            const device = await Device.create({name, price, brandId, typeId, img: filename})
            if(info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: {
                    brandId
                }, limit, offset
            })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: {
                    typeId
                }, limit, offset
            })
        }
        if (brandId && fileId) {
            devices = await Device.findAndCountAll({
                where: {
                    brandId,
                    typeId
                }, limit, offset
            })
        }
        return res.json(devices)
    }
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]         
    })
        return res.json(device)
    }
}

export const DeviceController = new DeviceControllerClass();