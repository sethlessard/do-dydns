import React from 'react';
import {
  App,
  Appbar,
  AppTitleContainer,
  AppTitle,
  AppbarToolbar,
  IconButton,
  AppContent,
  Page,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Table,
  TableHeader,
  TableData,
  TableRow,
  HeaderCell,
  Grid,
  GridItem,
  Text,
} from "@react-uix/web";

const theme = {
  colorPrimary: "#000000",
  colorSecondary: "#000000",
  text: {
    colorOnLight: "#111111",
    colorOnDark: "#ffffff"
  }
};

function DODynDnsApp() {
  return (
    <App theme={theme}>
      {/* 
      
      Appbar

      */}
      <Appbar>
        <AppTitleContainer>
          <AppTitle>Digital Ocean Dynamic DNS</AppTitle>
        </AppTitleContainer>
        <AppbarToolbar>
          <IconButton color="#fff">more_vert</IconButton>
        </AppbarToolbar>
      </Appbar>

      {/* 
      
      Content
      
      */}
      <AppContent>
        <Page>
          <Card z={2}>
            <CardHeader>
              <Heading h={6}>Status</Heading>
            </CardHeader>
            <CardBody>
              <Grid columns={2}>
                <GridItem>
                  <Text style={{fontWeight: "bold"}}>Current IP Address:</Text>
                </GridItem>
                <GridItem>
                  <Text>10.1.1.1</Text>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>

            </CardFooter>
          </Card>
        </Page>
      </AppContent>
    </App>
  );
}

export default DODynDnsApp;
