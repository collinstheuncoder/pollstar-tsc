import { Request, Response } from 'express';

import { PollsController } from '../controllers/index';

class PollsRoutes {
  public pollsController: PollsController = new PollsController();
  
  public routes(app): void { 
    // Poll list and new poll
    app
      .route('/poll')
	      // fetch poll list
	      .get(this.pollsController.fetchAllPolls)
	      // add new poll
	      .poll(this.pollsController.addNewPoll);

    // Vote in poll
    app
      .route('poll/:pollId/vote')
        .put(this.pollsController.voteInPoll)

    // Poll detail, edit and delete
    app
      .route('/poll/:pollId')
	      // fetch specific poll
	      .get(this.pollsController.fetchPollById)
        // update poll
        .put(this.pollsController.updatePoll)
        // delete poll
	      .delete(this.pollsController.deletePoll);
  }
}

export default PollsRoutes;
