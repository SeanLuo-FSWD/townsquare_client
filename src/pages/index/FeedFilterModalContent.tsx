import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "./FeedFilterModalContent.module.scss";
import { LoginContext } from "../../store/context/LoginContext";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doPeopleFilterUpdate,
} from "../../store/redux/actions/filter_act";
import { connect } from "react-redux";
//icons
import questionMarkIcon from "./assets/question-mark-button-svgrepo-com.svg";

function FeedFilterModalContent(props: any) {
  const { setCerror } = useContext(LoginContext);

  const [feedFilter, setFeedFilter] = useState(props.feedPg.feed);
  const [peopleFilter, setPeopleFilter] = useState(props.feedPg.people);

  let pplFilterHolder = props.feedPg.people;

  let applyOtherSide = false;
  const handleHasSyncFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyOtherSide = event.target.checked;
  };

  const peopleFilterProps = (ppl_filter: any) => {
    const key_name_pair = Object.entries(ppl_filter)[0];
    setPeopleFilter({ ...peopleFilter, [key_name_pair[0]]: key_name_pair[1] });
    pplFilterHolder = {
      ...pplFilterHolder,
      [key_name_pair[0]]: key_name_pair[1],
    };
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({
      ...feedFilter,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const onFeedFilterClick = () => {
    const feedPgSlice = {
      feedPg: {
        applied: true,
        people: peopleFilter,
        feed: feedFilter,
      },
    };

    props.onFeedFilterSubmit(feedPgSlice);

    if (applyOtherSide) {
      const peoplePgSlice = {
        peoplePg: {
          applied: true,
          people: peopleFilter,
          feed: feedFilter,
        },
      };
      props.onPeopleFilterSubmit(peoplePgSlice);
    }

    props.toggleFilterProp(false);
  };

  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterInfo}>
      <div className={styles.pageTitle}>
        <div>Filters</div>
        <div className={styles.clearButtonContainer}>
          <button
            className={styles.clearButton}
            onClick={() => {
              props.onFeedFilterRemove();
              props.toggleFilterProp(false);
            }} >
            Cancel
          </button>
        </div>
      </div>
      <hr />
      <h2>Post</h2>
      <FeedFilter
        feedFilterProps={feedFilterProps}
        feedPg_Feed={props.feedPg.feed}
      />
      <hr />
      <div>
        <h2>User
          <span className={styles.note}>
            (Filter posts from matching users only)
          </span>
        </h2>

      </div>
      <PeopleFilter
        peopleFilterProps={peopleFilterProps}
        feedPg_People={props.feedPg.people}
      />
      <FormControlLabel
          control={
            <Checkbox 
              onChange={handleHasSyncFilter} 
              name="Have_image" 
              style={{
                color: "#b4315b"
              }}/>
          }
          label="Apply to User page" />

      <div className={styles.footerWrapper}>
        <button
          className={styles.submitButton}
          onClick={onFeedFilterClick}
        >
          Submit
        </button>
      </div>
      </div>
    </div>
  );
}

// export default FeedFilterModalContent;
const mapStateToProps = (state: any) => {
  return {
    feedPg: state.filterState.feedPg,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFeedFilterSubmit: (feedPgSlice: any) =>
      dispatch(doFeedFilterUpdate(feedPgSlice)),
    onPeopleFilterSubmit: (peoplePgSlice: any) =>
      dispatch(doPeopleFilterUpdate(peoplePgSlice)),
    onFeedFilterRemove: () => dispatch(doFeedFilterRemove()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedFilterModalContent);
