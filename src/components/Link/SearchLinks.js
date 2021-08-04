import React, { useContext, useEffect, useState } from "react";
import {FirebaseContext} from '../../firebase/index';
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext);
  const [filter, setFilter] = useState('');
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db.collection('links')
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map( (doc) => ({ id: doc.id, ...doc.data() }) );
        setLinks(links);
        console.log('links: ', links);
      });
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
    });

    setFilteredLinks(matchedLinks);
  };

  return (
    <div>
    <form onSubmit={handleSearch}>
      <div>
        Search <input onChange={(event) => setFilter(event.target.value)}/>
        <button>OK</button>
      </div>
    </form>

    {
      filteredLinks.map( (filteredLink, index) => {
        return <LinkItem key={filteredLink.id} showCount={false} index={index} link={filteredLink}/>
      })
    }
    </div>
  );
}

export default SearchLinks;
