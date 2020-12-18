import CreatePiuDTO from "../dtos/CreatePiuDTO";
import Piu from "../model/Piu";

export default interface IPiusRepository {
    create(data: CreatePiuDTO): Promise<Piu>;
    save(data: Piu): Promise<Piu>;
    find(): Promise<Piu[]>;
}