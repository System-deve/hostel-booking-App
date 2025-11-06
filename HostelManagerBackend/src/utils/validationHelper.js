export const buildRoomFilter = (query) => {
  const { roomType, minPrice, maxPrice } = query;
  const filter = { isAvailable: true };

  if (roomType) filter.roomType = roomType;
  if (minPrice || maxPrice) {
    filter.roomPrice = {};
    if (minPrice) filter.roomPrice.$gte = Number(minPrice);
    if (maxPrice) filter.roomPrice.$lte = Number(maxPrice);
  }

  return filter;
};

export const filterRoomsByLocation = (rooms, location) => {
  if (!location?.trim()) return rooms;

  const searchTerm = location.trim().toLowerCase();
  return rooms.filter(room => {
    if (!room.hostelId?.location) return false;
    const roomLocation = room.hostelId.location.toLowerCase();
    return roomLocation.includes(searchTerm);
  });
};