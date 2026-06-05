# Stage 1

## Priority Inbox Design

The objective is to display the top 10 most important unread notifications.

### Priority Rules

Notification priority is determined using:

1. Notification Type Weight
2. Recency

Weights:

* Placement = 3
* Result = 2
* Event = 1

Priority Score:

Priority Score = (Weight × 1000) - AgeInMinutes

Higher scores indicate higher priority.

### Algorithm

1. Fetch notifications.
2. Calculate priority score for each notification.
3. Sort notifications in descending order of priority score.
4. Select the first 10 notifications.
5. Display the resulting list.

### Efficient Maintenance

For continuously arriving notifications:

1. Maintain a Min Heap of size 10.
2. Insert new notifications based on computed priority.
3. If heap size exceeds 10, remove the lowest-priority notification.

Complexity:

 Insert: O(log 10)
 Remove: O(log 10)
 Retrieval: O(1)

This approach avoids sorting the entire dataset whenever new notifications arrive.
