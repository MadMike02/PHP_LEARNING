REF - https://www.capitalone.com/tech/cloud/what-is-a-cluster/


# cluster
At a high level, a computer cluster is a `group of two or more computers, or nodes`, that `run in parallel to achieve a common goal`.
This allows workloads consisting of a high number of individual, parallelizable `tasks to be distributed` among the nodes in the cluster. As a result, these tasks can leverage the `combined memory and processing power` of each computer to increase overall performance.

To `build a computer cluster`, the `individual nodes` should be `connected in a network to enable internode communication`. Computer `cluster software` can then be used to `join the nodes together` and form a cluster. It `may have a shared storage device` and/or `local storage on each node`. Typically, at least `one node is designated as the leader node`, and acts as the `entry point` to the cluster. The leader node may be responsible for `delegating incoming work to the other nodes` and, if necessary, aggregating the results and returning a response to the user.

Ideally, a cluster functions as if it were a single system. A user accessing the cluster should not need to know whether the system is a cluster or an individual machine. Furthermore, a cluster should be designed to minimize latency and prevent bottlenecks in node to node communication.

# Types of Cluster Computing
- Highly available or fail-over
- Load balancing
- High performance computing

# Four advantages to cluster computing
1. High availability
    - `Availability` - the accessibility of a system or service over a period of time, usually expressed as a percentage of uptime during a given year (e.g. 99.999% availability, or five 9’s)
    - `Resilience` - how well a system recovers from failure
    - `Fault tolerance` - the ability of a system to continue providing a service in the event of a failure
    - `Reliability` - the probability that a system will function as expected
    - `Redundancy` - duplication of critical resources to improve system reliability
2. Load Balancing
    Load balancing is the act of `distributing traffic across the nodes` of a cluster to optimize performance and prevent any single node from receiving a disproportionate amount of work. A load balancer can be installed on the leader node(s) or provisioned separately from the cluster. By performing periodic health checks on each node in the cluster, the load balancer is able to detect if a node has failed, and if so it will route incoming traffic to the other nodes in the cluster.
3. Scaling
    There are two classifications of scaling: vertical and horizontal. `Vertical scaling` (also referred to as `scaling up/down`) involves `increasing or decreasing the resources allocated to a process`, such as the amount of memory, number of processor cores, or available storage. `Horizontal scaling` (`scaling out/in`), on the other hand, is when additional, `parallel jobs are run on the system`.
4. Performance
    When it comes to parallelization, clusters can `achieve higher performance levels than a single machine`. This is because they’re `not limited by a certain number of processor cores` or other hardware. Additionally, horizontal scaling can maximize performance by preventing the system from running out of resources.