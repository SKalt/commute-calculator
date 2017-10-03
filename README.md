# How Much Is Your Commute Worth?
Choosing where to live is a delicate balance of rent, roommates, amenities, and
commute.  This is a tool put hard numbers on how much commute time a location
will cost you.

## How this helps
This application selects candidate home locations and commute destinations, from
work to the gym to cool-looking cafes and restaurants. The application then uses
the Mapzen time-distance API to grab the commute times via specified modes of
transport at specified times of day.  The application finally compares weighted
sums of commute time (+ cost) for each candidate home location.

Using this saves you re-re-re-searching the commute times for each apartment you
 consider.

## Prior art
- [Trulia's commute map](https://www.trulia.com/local/los-angeles-ca/driving:0|transit:1|position:34.052218;-118.243389|time:60_commute)
- [Mapbox's time map](https://blog.mapbox.com/a-new-kind-of-map-its-about-time-7bd9f7916f7f)
- [Mapzen's APIs, which power this application](#)
- the saying "time is money"
- Discussing distances in terms of time (at least in the US)



##  How this helps
Time is money, the saying goes.  The ratio of time to money varies from person
to person depending on their ability to turn time into money and their
willingness to pay to save time. ClearerThinking's survey to estimate your
demand for time](http://programs.clearerthinking.org/what_is_your_time_really_worth_to_you.html)
is a good starting point to figuring out your time:money ratio.
