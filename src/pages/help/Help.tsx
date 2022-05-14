import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory } from "react-router-dom";
import styles from "./help.module.scss";
import HelpNav from "./HelpNav";

function Help() {
  const history = useHistory();

  return (
    <div className="pagePadding">
      {/* <Navbar currentPath={window.location.pathname} /> */}
      {/* <SubNav className="flex--space-between">
        <button
          className={styles.backButton}
          onClick={() => {
            history.goBack();
          }}
        >
          Back
          <img src={backIcon} className={styles.backIcon} />
        </button>
      </SubNav> */}
      <HelpNav className="flex--space-between"></HelpNav>
      <div className={styles.helpWrapper}>
        <h2 style={{ marginTop: "60px" }}>Important:</h2>

        <p>
          <strong>
            Due to cross-origin hosting between the API and client, please make
            sure to use Chrome only, and that "Allow all cookies" are selected
            if using incognito mode.&nbsp;
            <a
              href="https://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Callow-or-block-cookies"
              target="_blank"
            >
              See here for instructions.
            </a>
          </strong>
        </p>
        <br />
        <p>
          Please do not spam or post massive amounts of pictures(20+), as our
          server is hosted on a free tier!
        </p>
        <br />
        <p>
          <strong>
            Click&nbsp;
            <a href="https://youtu.be/TWWylIMUOBg" target="_blank">
              Here
            </a>
            &nbsp;to see the full app demo.
          </strong>
        </p>

        <h2>FAQ/HELP:</h2>
        <h3>Filters</h3>
        <h4>How does the basic filter works?</h4>
        <p>The filter allows you to filter for desired posts or users. </p>
        <p>
          For posts, you can filter by "matching keywords" (case insensitive and
          can accept multiple words), or by whether the post has images
        </p>
        <p>
          For users you can filter by location, gender, age, and whether you
          followed them.
        </p>

        <h4>What are cross-filters ?</h4>
        <p>
          You can apply users criteria to posts, and vice versa. The
          cross-filter criteria are shown below the main criteria.
        </p>

        <p>
          - If you are on the post-feed page, applying USER criteria will only
          show posts FROM users having the matched criteria.
        </p>
        <p>
          - If you are on the users page, applying POST criteria will only show
          users who HAVE MADE the posts having the matched criteria.
        </p>

        <h4>Can I mix and match the filters?</h4>
        <p>
          You can definitely apply more than 1 criteria on the filter. In this
          case, only the posts/users/ that satisfies all the criteria will be
          shown.
        </p>

        <h4>Can I apply the post filter to the users page, and vice versa?</h4>

        <p>
          Yes, if you check box the "", then the criteria will be apply to the
          other page (ie, to the users page if you are on posts page).
        </p>
        <p>
          Once you navigate to the other page, you will see the criteria already
          applied.
        </p>

        <h4>How to unapply filter</h4>
        <p>
          On the filter page, click on the "clear" button on the bottom right.
          This will cancel all applied criteria.
        </p>

        <h3>How do I see the "followed" users?</h3>
        <p>
          As we are an "open world" app, by default you will see everything. To
          see only the users you followed, use the filter, and check the
          "followed" box.
        </p>

        <h3>Why am I seeing empty chats?</h3>

        <p>
          Everytime someone click into chat with you or if you click into chat
          with someone, a new chat is created and will show up on both you and
          the other person's chatlist.
        </p>

        <h3>The notification for new messages are not appearing</h3>

        <p>
          In order to simplify the implementation, the notification for chat
          will only appear if you are not on a chat or chat list page.
        </p>

        <h3>How can I remove my posts?</h3>
        <p>
          You can do so either on the post page, or your profile view. On the
          post page, all your posts will have a trash icon on top right. On your
          own profile view, you will see all your posts with the trash icon
          below your profile information
        </p>
        <h3>Can I remove my profile?</h3>
        <p>
          Yes, if you go to the profile page, the option to remove your profile
          is at the bottom (Below logout). All your account information will be
          erased, except the chat messages with other users. Please be sure
          before you click the button.
        </p>

        <h3>Can I remove my comment?</h3>
        <p>
          No. Unfortunately we haven't had the time to implement that feature.
          So don't write comment you may regret!
        </p>

        <h3>Why do I see only 20 posts?</h3>
        <p>
          We limit to only the 20 most recents posts, to avoid request overload.
        </p>
        <p>
          To see older/other posts that interest you, please use the filter
          feature, which will return another 20 recent posts by matching
          criteria.
        </p>

        <h3>Additional help</h3>
        <p style={{ paddingBottom: "20px" }}>
          Please let Sean know if you need anything.
        </p>
      </div>
      <div className={styles.helpWrapper}>
        <h2>Tech Stack:</h2>
        <h3>Front End</h3>
        <p>React: hosted on Vercel</p>

        <h3>Backend</h3>
        <p>Node.js: hosted on Heroku</p>

        <h3>Database</h3>
        <p style={{ paddingBottom: "100px" }}>Mongodb: hosted on Atlas</p>
      </div>
    </div>
  );
}

export default Help;
