import { distanceInWords, distanceInWordsToNow } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import {FirebaseContext} from '../../firebase/index'
import LinkItem from "./LinkItem";

function LinkDetail(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const [ link, setLink ] = useState(null);
  const [ commentText, setCommentText] = useState();

  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection('links').doc(linkId);

  useEffect( () => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get()
      .then( (doc) => setLink({ id: doc.id, ...doc.data()}) );
  }

  function handleAddComment() {
    if (!user) {
      props.history.push('/login');
      return;
    }

    linkRef.get().then( (doc) => {
      if (doc.exists) {
        const prevComments = doc.data().comments;
        const comment = {
          created: Date.now(),
          postedBy: { id: user.uid, name: user.displayName },
          text: commentText,
        };
        const updatedComments = [ ...prevComments, comment ];
        linkRef.update({ comments: updatedComments });
        setLink( (prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
        setCommentText('');
      }
    })
  }

  return !link ?
    (
      <div>Loading...</div>
    ) : (
      <div>
        <LinkItem showCount={false} link={link} />
        <textarea 
          cols='60'
          onChange={(event) => setCommentText(event.target.value) }
          rows='6'
          value={commentText}
        />
        <div>
          <button className="button" onClick={handleAddComment}>Add Comment</button>
        </div>
        {
          link.comments.map((comment, index) => (
            <div key={index}>
              <p className="comment-author">
                {comment.postedBy.name} | {distanceInWordsToNow(comment.created)}
              </p>
              <p>{comment.text}</p>
            </div>
          ))
        }
      </div>
    );
}

export default LinkDetail;
