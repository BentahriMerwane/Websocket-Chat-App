//link : https://onexlab-io.medium.com/docker-compose-mongodb-prod-dev-test-environment-eb1a75675f93

// insert-data.js

db = db.getSiblingDB('mydb'); // Use or create the database 'mydb'

// Create the rooms collection and insert example data
db.rooms.insertMany([
  {
    _id: ObjectId("60c72b2f9b1e8b0b4f0d5a1a"),
    name: "Entrance Hall",
    description: "The grand entrance hall with marble floors.",
    connections: []
  },
  {
    _id: ObjectId("60c72b2f9b1e8b0b4f0d5a1b"),
    name: "Library",
    description: "A quiet room filled with shelves of books.",
    connections: []
  },
  {
    _id: ObjectId("60c72b2f9b1e8b0b4f0d5a1c"),
    name: "Dining Room",
    description: "A large room with a long dining table.",
    connections: []
  },
  {
    _id: ObjectId("60c72b2f9b1e8b0b4f0d5a1d"),
    name: "Kitchen",
    description: "A modern kitchen with stainless steel appliances.",
    connections: []
  }
]);

// Create the moves collection and insert example data
db.moves.insertMany([
  {
    _id: ObjectId("60c72b3e9b1e8b0b4f0d5a1e"),
    timestamp: new Date("2024-06-09T12:00:00Z"),
    from_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1a"),
    to_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1b"),
    user_id: "user1"
  },
  {
    _id: ObjectId("60c72b3e9b1e8b0b4f0d5a1f"),
    timestamp: new Date("2024-06-09T12:05:00Z"),
    from_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1b"),
    to_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1d"),
    user_id: "user1"
  },
  {
    _id: ObjectId("60c72b3e9b1e8b0b4f0d5a20"),
    timestamp: new Date("2024-06-09T12:10:00Z"),
    from_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1d"),
    to_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1b"),
    user_id: "user1"
  },
  {
    _id: ObjectId("60c72b3e9b1e8b0b4f0d5a21"),
    timestamp: new Date("2024-06-09T12:15:00Z"),
    from_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1b"),
    to_room_id: ObjectId("60c72b2f9b1e8b0b4f0d5a1a"),
    user_id: "user1"
  }
]);
