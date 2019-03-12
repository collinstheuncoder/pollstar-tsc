import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// Other views
import LandingPage from '../../views/Landing';
import HomePage from '../../views/Home';
import NotFoundPage from '../../views/NotFound';

// User views
import RegisterPage from '../../views/auth/Register';
import LoginPage from '../../views/auth/Login';

// Polls views
import PollListPage from '../../views/polls/PollList';
import PollCategoriesPage from '../../views/polls/PollCategories';
import PollDetailPage from '../../views/polls/PollDetail';
import NewPollPage from '../../views/polls/NewPoll';

function Main() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/auth/register" component={RegisterPage} />
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/polls" component={PollListPage} />
        <Route path="/polls/new" component={NewPollPage} />
        <Route path="/polls/categories" component={PollCategoriesPage} />
        <Route path="/polls/c/:categoryName/p/:pollId" component={PollDetailPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  );
}
export default Main;
