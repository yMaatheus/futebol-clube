import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IMatchService } from '../../domain/usecases/match.service';

class MatchController {
  constructor(private service: IMatchService) {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.finish = this.finish.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    let progressValue;
    if (typeof inProgress === 'string') progressValue = inProgress.toLowerCase() === 'true';

    const matches = await this.service.getAll(progressValue);

    res.status(StatusCodes.OK).json(matches);
  }

  async create(req: Request, res: Response) {
    const match = await this.service.create(req.body);

    res.status(StatusCodes.CREATED).json(match);
  }

  async finish(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.updateById({ inProgress: false }, +id);

    res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.update(+id, req.body);

    res.status(StatusCodes.OK).json({ message: 'Updated' });
  }
}

export default MatchController;
