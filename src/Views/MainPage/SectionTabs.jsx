import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
import FacebookIcon from '@mui/icons-material/Facebook';
// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Button from "../../components/CustomButtons/Button.js";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import styles from "../../assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { About } from "./About.jsx";
import { ContactPage } from "./ContactPage.jsx";

const useStyles = makeStyles(styles);

export const SectionTabs = () => {
  const classes = useStyles();
  return (
  
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="nav-tabs">
          {/* <h3>Navigation Tabs</h3> */}
          <GridContainer>
          <div className="gribcon">

            <GridItem  md={4} >
              {/* <h3>
                <small>Tabs with Icons on Card</small>
              </h3> */}
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Profile",
                    tabIcon: FacebookIcon,
                    tabContent: (
                      <p className={classes.textCenter}>
                 <a
                           style={{textDecoration: 'none'}}
                              href={"https://www.facebook.com"}
                              target="_blank"
                            >
                              {" "}
                              <Button color="primary" size="lg" >Salah Alzuhbi</Button>
                              
                            </a>
              
                      </p>
                    ),
                  },
                  {
                    tabName: "Messages",
                    tabIcon: Chat,
                    tabContent: (
                      <p className={classes.textCenter}>
                   <a
                              style={{ textDecoration: "auto", color: "green" }}
                              href={`https://api.whatsapp.com/send/?phone=+962797898026&text=Hi Salah From Psi Amman.`}
                              target="_blank"
                            >
                              {" "}
                              <Button color="success" size="lg" >  <span className="mdi mdi-whatsapp px-2" />
                              WhatsApp</Button>
                            
                            </a>
                      </p>
                    ),
                  },
                  {
                    tabName: "Contacts",
                    tabIcon: ContactPageIcon,
                    tabContent: (
             <div>
               
            {/* <ContactPage/> */}
               </div>
                    ),
                  },
                ]}
              />
            </GridItem>
            {/* <GridItem  md={5}  >
              <h3>
                <small></small>
              </h3>
              <CustomTabs
                plainTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Home",
                    tabContent: (
                      <p className={classes.textCenter}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    ),
                  },
                  {
                    tabName: "Updates",
                    tabContent: (
                      <p className={classes.textCenter}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. I will be the leader of a company
                        that ends up being worth billions of dollars, because I
                        got the answers. I understand culture. I am the nucleus.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    ),
                  },
                  {
                    tabName: "History",
                    tabContent: (
                      <p className={classes.textCenter}>
                        think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    ),
                  },
                ]}
              />
            </GridItem> */}
            </div>
          </GridContainer>
        </div>
      </div>
    </div>
   
  );
}
