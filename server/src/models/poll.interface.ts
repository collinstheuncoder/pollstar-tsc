interface Poll {
  title: string;
  category: string;
  addedBy: string;
  votedBy?: [string];
}
 
export default Poll;