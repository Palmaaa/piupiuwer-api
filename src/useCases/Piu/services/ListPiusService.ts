import IPiusRepository from "../repositories/IPiusRepository";

class ListPiusService {
    private piusRepository: IPiusRepository;

    constructor(piusRepository: IPiusRepository) {
        this.piusRepository = piusRepository;
    }

    public async execute() {
        const pius = await this.piusRepository.find();

        return pius;
    }
}

export default ListPiusService;