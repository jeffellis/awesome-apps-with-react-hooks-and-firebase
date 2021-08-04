import React, { useContext, useEffect, useState } from "react";
import {FirebaseContext} from '../../firebase/index'

import LinkItem from './LinkItem';
import {LINKS_PER_PAGE} from '../../utils/index'

const EPOCH = new Date(0);

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);

  const isNewPage = props.location.pathname.includes('new');
  const page = Number(props.match.params.page);

  useEffect(() => {
    const unsubscribe = isNewPage ? getNewLinks() : getTopLinks();
    return () => unsubscribe();
  }, [isNewPage, page]);

  function getNewLinks() {
    const startAfter = page > 1 ? cursor.created : EPOCH;
    return firebase.db
      .collection('links')
      .orderBy('created', 'desc')
      .startAfter(startAfter)
      .limit(LINKS_PER_PAGE)
      .onSnapshot(handleSnapshot);
  }

  function getTopLinks() {
    return firebase.db
      .collection('links')
      .orderBy('voteCount', 'desc')
      .limit(LINKS_PER_PAGE)
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map( (doc) => ({ id: doc.id, ...doc.data() }) );
    const lastLink = links[links.length - 1];
    setLinks(links);
    setCursor(lastLink);
    console.log(snapshot);
  }

  function visitPreviousPage() {
    page > 1 && props.history.push(`/new/${page - 1}`);
  }

  function visitNextPage() {
    page <= links.length / LINKS_PER_PAGE && props.history.push(`/new/${page + 1}`);
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0
  return (
    <div>
      {
        links.map( (link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={pageIndex + index}
          />
        ))
      }
      { isNewPage &&
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
          <div className="pointer mr2" onClick={visitNextPage}>Next</div>
        </div>
      }
    </div>
  );
}

export default LinkList;
