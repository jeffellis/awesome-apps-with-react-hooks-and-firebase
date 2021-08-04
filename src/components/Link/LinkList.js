import React, { useContext, useEffect, useState } from "react";
import {FirebaseContext} from '../../firebase/index'

import LinkItem from './LinkItem';

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes('new');

  useEffect(() => {
    const unsubscribe = getLinks();

    return () => unsubscribe();
  }, []);

  function getLinks() {
    return firebase.db
      .collection('links')
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map( (doc) => ({ id: doc.id, ...doc.data() }) );
    setLinks(links);
  }

  function getSortedLinks() {
    if (isNewPage) {
      return links;
    }
    
    // Must be on the 'top' page. Shallow copy using slice and sort by the number of votes
    const topLinks = links.slice().sort( (l1, l2) => l2.votes.length - l1.votes.length );
    return topLinks;
  }

  return (
    <div>
      {
        getSortedLinks().map( (link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + 1}
          />
        ))
      }
    </div> 
  );
}

export default LinkList;
