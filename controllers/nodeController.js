const network = require('../models/models');

class NodeController {
    async create(req, res) {
        try {
            const {name, ip, port, parentId} = req.query;
            const node = await network.create({
                name,
                ip,
                port,
                parentId
            });
            await res.send(node);
        } catch (err) {
            console.log(err);
        }
    }

    async getUpperNodes(req, res) {
        try {
            const nodes = await network.findAll({where: {parentId: -1}, raw: true});
            res.send(nodes);
        } catch (err) {
            console.log(err);
        }
    }

    async getNodeById(req, res) {
        try {
            const nodeId = req.params.parentId;
            const node = await network.findByPk(nodeId);
            res.send(node);
        } catch (err) {
            console.log(err);
        }
    }
}

const nodeController = new NodeController();

module.exports = nodeController;