        function showPage(pageId) {
            var pages = document.querySelectorAll('.content');
            for (var i = 0; i < pages.length; i++) {
                pages[i].classList.remove('active');
            }

            var pageToShow = document.getElementById(pageId);
            pageToShow.classList.add('active');
        }

        function toggleForm() {
            var adminLogin = document.getElementById('admin-login');
            var signup = document.getElementById('signup');

            if (adminLogin.style.display === 'block') {
                adminLogin.style.display = 'none';
                signup.style.display = 'block';
            } else {
                adminLogin.style.display = 'block';
                signup.style.display = 'none';
            }
        }

       
        let slideIndex = 0;

        function showSlides() {
            const slides = document.querySelectorAll('.slide');
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            } else if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            slides[slideIndex].style.display = 'block';
        }

        function moveSlide(n) {
            slideIndex += n;
            showSlides();
        }

        setInterval(() => {
            slideIndex++;
            showSlides();
        }, 5000); 

        const graph = {
            "Pattan Kodoli": {
                "Alatwadi": 3,
                "Ingali": 2.15,
                "Tal-Phata": 2.5,
                "Talandage": 2,
                "Sangwade": 2,
                "Vasagade": 2
            },
            "Alatwadi": {
                "Pattan Kodoli": 3,
                "Sangwade-Phata": 1.5
            },
            "Ingali": {
                "Pattan Kodoli": 2.15,
                "Halsawade": 1.5,
                "Tal-Phata": 1.25,
                "Hupari": 3
            },
            "Tal-Phata": {
                "Pattan Kodoli": 2.5,
                "Talandage": 1,
                "Hupari": 1.5,
                "Ingali": 1.25
            },
            "Talandage": {
                "Pattan Kodoli": 2,
                "Tal-Phata": 1,
                "Vasagade": 0.5
            },
            "Sangwade": {
                "Pattan Kodoli": 2,
                "Sangwade-Phata": 0.5,
                "Halsawade": 0.5
            },
            "Sangwade-Phata": {
                "Alatwadi": 1.5,
                "Sangwade": 0.5,
                "Vasagade": 0.5
            },
            "Vasagade": {
                "Pattan Kodoli": 2,
                "Talandage": 0.5,
                "Sangwade-Phata": 0.5,
                "Midc": 1
            },
            "Midc": {
                "Vasagade": 1,
                "Halsawade": 1,
                "Randeviwadi": 2,
                "Yalgud": 5
            },
            "Randeviwadi": {
                "Midc": 2,
                "Yalgud": 2.15
            },
            "Yalgud": {
                "Randeviwadi": 2.15,
                "Midc": 5,
                "Kabnur": 1.5
            },
            "Hupari": {
                "Ingali": 3,
                "Tal-Phata": 1.5,
                "Rendal": 1.5,
                "Jawahar": 3
            },
            "Rendal": {
                "Hupari": 1.5,
                "Jawahar": 1.5
            },
            "Jawahar": {
                "Rendal": 1.5,
                "Hupari": 3,
                "Rui": 1
            },
            "Rui": {
                "Jawahar": 1,
                "Kabnur": 1.5
            },
            "Kabnur": {
                "Rui": 1.5,
                "Yalgud": 1.5
            },
            "Halsawade": {
                "Sangwade": 0.5,
                "Ingali": 1.5,
                "Midc": 1
            }
        };

        function findShortestRoute() {
            const source = document.getElementById("source").value;
            const destination = document.getElementById("destination").value;

            const visited = new Set();
            const distance = {};
            const previous = {};
            const unvisitedNodes = new PriorityQueue();

            for (let vertex in graph) {
                distance[vertex] = Infinity;
                previous[vertex] = null;
            }

            distance[source] = 0;
            unvisitedNodes.enqueue(source, 0);

            while (!unvisitedNodes.isEmpty()) {
                const currentVertex = unvisitedNodes.dequeue().element;
                visited.add(currentVertex);

                for (let neighbor in graph[currentVertex]) {
                    if (!visited.has(neighbor)) {
                        const newDistance = distance[currentVertex] + graph[currentVertex][neighbor];
                        if (newDistance < distance[neighbor]) {
                            distance[neighbor] = newDistance;
                            previous[neighbor] = currentVertex;
                            unvisitedNodes.enqueue(neighbor, newDistance);
                        }
                    }
                }
            }

            const path = [];
            let current = destination;
            while (current !== null) {
                path.unshift(current);
                current = previous[current];
            }

            displayRoute(path, distance[destination]);
        }

        function displayRoute(path, distance) {
            const resultDiv = document.getElementById("routeResult");
            if (path.length === 0) {
                resultDiv.innerHTML = "No route found.";
                return;
            }

            let output = "<p>Shortest Route:</p><ul>";
            for (let i = 0; i < path.length; i++) {
                output += `<li>${path[i]}</li>`;
            }
            output += `</ul><p>Total Distance: ${distance} km</p>`;
            resultDiv.innerHTML = output;
        }

        class PriorityQueue {
            constructor() {
                this.items = [];
            }

            enqueue(element, priority) {
                const queueElement = {
                    element,
                    priority
                };
                let added = false;
                for (let i = 0; i < this.items.length; i++) {
                    if (queueElement.priority < this.items[i].priority) {
                        this.items.splice(i, 0, queueElement);
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    this.items.push(queueElement);
                }
            }

            dequeue() {
                return this.items.shift();
            }

            isEmpty() {
                return this.items.length === 0;
            }
        }