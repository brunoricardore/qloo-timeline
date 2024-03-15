const timelineItems: RawEvents[] = [
  {
    id: 1,
    start: "2021-01-01",
    end: "2021-01-05",
    name: "First item"
  },
  {
    id: 98,
    start: "2021-01-01",
    end: "2021-01-01",
    name: "Almost Overlap Item"
  },
  {
    id: 99,
    start: "2021-01-01",
    end: "2021-01-03",
    name: "Overlap Item"
  },
  {
    id: 2,
    start: "2021-01-02",
    end: "2021-01-08",
    name: "Second item"
  },
  {
    id: 3,
    start: "2021-01-06",
    end: "2021-01-13",
    name: "Bruno Ricardo"
  },
  {
    id: 4,
    start: "2021-01-14",
    end: "2021-01-14",
    name: "Another item"
  },
  {
    id: 5,
    start: "2021-02-01",
    end: "2021-02-15",
    name: "Third item"
  },
  {
    id: 6,
    start: "2021-01-12",
    end: "2021-02-16",
    name: "Endless Event"
  },
  {
    id: 7,
    start: "2021-02-01",
    end: "2021-02-02",
    name: "Fifth item with a super long name"
  },
  {
    id: 8,
    start: "2021-01-03",
    end: "2021-01-05",
    name: "First item"
  },
  {
    id: 9,
    start: "2021-01-04",
    end: "2021-01-08",
    name: "Second item"
  },
  {
    id: 10,
    start: "2021-01-06",
    end: "2021-01-13",
    name: "Another item"
  },
  {
    id: 11,
    start: "2021-01-09",
    end: "2021-01-09",
    name: "Another item"
  },
  {
    id: 12,
    start: "2021-02-01",
    end: "2021-02-15",
    name: "Third item"
  },
  {
    id: 13,
    start: "2021-01-12",
    end: "2021-02-16",
    name: "Fourth item with a super long name"
  },
  {
    id: 14,
    start: "2021-02-01",
    end: "2021-02-02",
    name: "Fifth item with a super long name"
  },
  {
    id: 15,
    start: "2022-10-10",
    end: "2022-10-12",
    name: "Fifth item with a super long name"
  },
  {
    id: 75,
    start: "2022-11-05",
    end: "2022-11-07",
    name: "Fifth item with a super long name"
  },
  {
    id: 71,
    start: "2023-10-10",
    end: "2023-10-12",
    name: "Fifth item with a super long name"
  },
  {
    id: 16,
    start: "2023-11-05",
    end: "2023-11-07",
    name: "Fifth item with a super long name"
  }
];

export interface RawEvents {
  id: number;
  start: string;
  end: string;
  name: string;
}

export interface CalendarEvent {
  id: number;
  start: Date;
  end: Date;
  name: string;
  bgColor: string;
  slotSize: number;
  lane?: number;
  fromLastMonth?: boolean;
}

export default timelineItems;
