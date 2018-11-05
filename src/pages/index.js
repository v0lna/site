import React from 'react'
import { graphql } from 'gatsby'
import { mapProps } from 'recompose'
import Helmet from 'react-helmet'

import SubscriptionForm from '../components/subscription-form/subscription-form'
import UpcomingEvents from '../components/home-page/upcoming-events-block'
import PastEvents from '../components/home-page/past-events'
import SocialLinksBlock from '../components/social-links-block'
import { selectNearestEvent } from '../utils/selectors'
import { HiddenText } from '../utils/accessibility'
import Layout from '../components/layout'

const IndexPage = ({ upcomingEvent, pastTalks }) => (
  <Layout>
    <Helmet title="Home" />
    <HiddenText>
      <h1>Home</h1>
    </HiddenText>
    {upcomingEvent && <UpcomingEvents event={upcomingEvent} />}
    <PastEvents talks={pastTalks} />
    <SubscriptionForm />
    <SocialLinksBlock />
  </Layout>
)

export default mapProps(
  ({
    data: {
      upcommingEvents: { edges: allEventNodes },
      pastTalks: { edges: pastTalks },
    },
  }) => {
    let extendTalk = event => talk => ({ ...talk, event })

    let upcomingEvent = selectNearestEvent(allEventNodes)
    return {
      upcomingEvent: upcomingEvent && {
        ...upcomingEvent,
        talks: upcomingEvent.fields.talks.map(extendTalk(upcomingEvent)),
      },
      pastTalks: pastTalks.map(t => t.node),
    }
  },
)(IndexPage)

export const pageQuery = graphql`
  query IndexQuery {
    upcommingEvents: allEventYaml(
      sort: { fields: [date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
            talks {
              title
              speaker {
                fields {
                  slug
                }
                title
                avatar
              }
            }
          }
          title
          date
          address
        }
      }
    }

    pastTalks: allEventTalk(sort: { fields: date, order: DESC }, limit: 7) {
      edges {
        node {
          title
          speaker {
            fields {
              slug
            }
            id
            avatar
          }
          event {
            fields {
              slug
            }
            title
          }
        }
      }
    }
  }
`
