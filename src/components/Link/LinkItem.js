import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { getDomain } from '../../utils';
import { FirebaseContext } from '../../firebase/index'

function LinkItem({ history, index, link, showCount }) {

  const { firebase, user } = useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push('/login');
      return;
    }

    const voteRef = firebase.db.collection('links').doc(link.id);
    voteRef.get().then((doc) => {
      if (doc.exists) {
        const previousVotes = doc.data().votes;
        const vote = {
          votedBy: {
            id: user.uid,
            name: user.displayName,
          }
        }
        const updatedVotes = [...previousVotes, vote];
        voteRef.update({ voteCount: updatedVotes.length, votes: updatedVotes });
      }
    })
  }

  function handleDeleteLink() {
    const linkRef = firebase.db.collection('links').doc(link.id);
    linkRef.delete().then(() => {
      console.log(`Document with ID ${link.id} deleted`);
    }).catch((err) => {
      console.error(`Error deleting document id ${link.id}`);
    });
  }

  const postedByUser = user && user.uid === link.postedBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        { showCount && <span className="gray">{index}</span> }
        <div className="vote-button" onClick={handleVote}>&#9650;</div>
      </div>
      <div className="ml1">
        <div>
        <a className="black no-underline" href={link.url} target="_blank" rel="noopener noreferrer">{link.description}</a>
        <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.voteCount} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)} {" | "}
          <Link to={`/link/${link.id}`}>
            { link.comments.length > 0 
                ? `${link.comments.length} comments`
                : "discuss"
            }
          </Link>
          {
            postedByUser && (
              <>
              {" | "}
              <span className="delete-button" onClick={handleDeleteLink}>delete</span>
              </>
            )
          }
        </div>
      </div>  
    </div>
  );
}

export default withRouter(LinkItem);
