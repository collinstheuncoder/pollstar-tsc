import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { Poll } from '../models/index';

class PollsController {
  public async addNewPoll(req: Request, res: Response) {
    const { title, category, choices, addedBy } = req.body;

    const formattedChoices = () =>
      choices.map(choice => {
        const formattedChoice = { name: choice, votes: 0 };
        return formattedChoice;
      });

    try {
      // Save new poll to DB
      const newPoll = await Poll.create({
        title,
        category,
        choices: formattedChoices(),
        addedBy,
      });

      res.status(200).json({
        success: true,
        newPoll,
        message: 'Successful Submission.',
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async voteInPoll(req: Request, res: Response) {
    const { category, pollId } = req.params;
    const { name, choiceId, voterId } = req.body;

    try {
      const poll = await Poll.findById(pollId);

      // Check if user has already voted in poll
      const hasVoted = poll.votedBy.some(voter => voter.equals(voterId));

      if (!voterId) {
        // throw new Error('Sorry, you must be logged in to vote');
        res
          .status(401)
          .json({ message: 'Sorry, you must be logged in to vote' });
      } else if (voterId && hasVoted) {
        //throw new Error('Sorry, you can vote only once');
        res
          .status(401)
          .json({ message: 'Sorry, you have already participated in vote' });
      } else {
        const choice = await poll.choices.id(choiceId);
        const votedChoice = { name, votes: choice.votes + 1 };

        await choice.set(votedChoice);
        await poll.votedBy.push(voterId);
        
        poll.save();

        res
          .status(200)
          .json({
            message: 'Thank you for voting.',
            poll,
          });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async fetchAllPolls(req: Request, res: Response) {
    try {
      const polls = await Poll.find();

      res.status(200).json({ polls });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async fetchPollById(req: Request, res: Response) {
    try {
      const poll = await Poll.findById(req.params.pollId);

      res.status(200).json({ poll });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async updatePoll(req: Request, res: Response) {
    try {
      const updatedPoll = await Poll.findByIdAndUpdate(
        req.params.pollId, 
        req.body,
        { new: true }
      );

      res.status(200).json({ updatedPoll });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async deletePoll(req: Request, res: Response) {
    try {
      await Poll.findByIdAndDelete(req.params.pollId);

      res.json({ message: 'Successfully deleted Poll!' });
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}

export default PollsController
