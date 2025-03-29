// Global variables
let cities = [];
const citySelect = document.getElementById('city-select');
const getForecastBtn = document.getElementById('get-forecast');
const loadingSection = document.getElementById('loading');
const errorSection = document.getElementById('error-message');
const forecastContainer = document.getElementById('forecast-container');
const cityNameElement = document.getElementById('city-name');
const cityCoordinatesElement = document.getElementById('city-coordinates');
const forecastCardsContainer = document.getElementById('forecast-cards');
const currentLocationSection = document.getElementById('current-location-weather');
const locationForecastContainer = document.getElementById('location-forecast-container');
const refreshLocationBtn = document.getElementById('refresh-location');
const navButtons = document.querySelectorAll('.nav-button');
const pageSections = document.querySelectorAll('.page-section');
const provinceCitiesContainer = document.getElementById('province-cities');
const popularCitiesGrid = document.querySelector('.popular-cities-grid');
const regionCitiesContainer = document.getElementById('region-cities');
const continentCitiesContainer = document.getElementById('continent-cities');

// Weather condition mapping for 7Timer API with enhanced descriptions
const weatherConditions = {
    'clear': { 
        description: 'Clear sky with excellent visibility', 
        icon: 'clear.png',
        theme: 'theme-clear'
    },
    'pcloudy': { 
        description: 'Partly cloudy with some sunshine', 
        icon: 'pcloudy.png',
        theme: 'theme-cloudy'
    },
    'mcloudy': { 
        description: 'Mostly cloudy with limited sunshine', 
        icon: 'mcloudy.png',
        theme: 'theme-cloudy'
    },
    'cloudy': { 
        description: 'Overcast conditions with full cloud cover', 
        icon: 'cloudy.png',
        theme: 'theme-cloudy'
    },
    'humid': { 
        description: 'Humid conditions with high moisture', 
        icon: 'humid.png',
        theme: 'theme-cloudy'
    },
    'lightrain': { 
        description: 'Light rainfall, consider a light raincoat', 
        icon: 'lightrain.png',
        theme: 'theme-rain'
    },
    'oshower': { 
        description: 'Occasional rain showers throughout the day', 
        icon: 'oshower.png',
        theme: 'theme-rain'
    },
    'ishower': { 
        description: 'Isolated rain showers in some areas', 
        icon: 'ishower.png',
        theme: 'theme-rain'
    },
    'lightsnow': { 
        description: 'Light snowfall, roads may be slippery', 
        icon: 'lightsnow.png',
        theme: 'theme-snow'
    },
    'rain': { 
        description: 'Steady rainfall, waterproof gear recommended', 
        icon: 'rain.png',
        theme: 'theme-rain'
    },
    'snow': { 
        description: 'Snowfall, warm clothing essential', 
        icon: 'snow.png',
        theme: 'theme-snow'
    },
    'rainsnow': { 
        description: 'Mixed rain and snow precipitation', 
        icon: 'rainsnow.png',
        theme: 'theme-snow'
    },
    'tsrain': { 
        description: 'Thunderstorms with rain, seek shelter', 
        icon: 'tsrain.png',
        theme: 'theme-storm'
    },
    'tstorm': { 
        description: 'Thunderstorms, outdoor activities not advised', 
        icon: 'tstorm.png',
        theme: 'theme-storm'
    },
    'windy': { 
        description: 'Windy conditions, secure loose items', 
        icon: 'windy.png',
        theme: 'theme-windy'
    },
    'fog': { 
        description: 'Foggy with reduced visibility, drive carefully', 
        icon: 'fog.png',
        theme: 'theme-fog'
    }
};

// Traditional Himalayan calendar month names
const traditionalMonths = {
    1: 'First Month',
    2: 'Second Month',
    3: 'Third Month',
    4: 'Fourth Month',
    5: 'Fifth Month',
    6: 'Sixth Month',
    7: 'Seventh Month',
    8: 'Eighth Month',
    9: 'Ninth Month',
    10: 'Tenth Month',
    11: 'Eleventh Month',
    12: 'Twelfth Month'
};

// Traditional Himalayan day names
const traditionalDays = {
    0: 'Sun Day',
    1: 'Moon Day',
    2: 'Mars Day',
    3: 'Mercury Day',
    4: 'Jupiter Day',
    5: 'Venus Day',
    6: 'Saturn Day'
};

// Popular cities for quick selection
const popularCities = [
    { city: 'Kathmandu', country: 'Nepal', province: 'Bagmati', image: 'https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2F0aG1hbmR1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { city: 'Pokhara', country: 'Nepal', province: 'Gandaki', image: 'https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9raGFyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { city: 'Biratnagar', country: 'Nepal', province: 'Province 1', image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVwYWwlMjBjaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { city: 'Birgunj', country: 'Nepal', province: 'Madhesh', image: 'https://images.unsplash.com/photo-1558799401-5df80f811fc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmVwYWwlMjBjaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' },
    { city: 'Dhangadhi', country: 'Nepal', province: 'Sudurpashchim', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5lcGFsJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { city: 'Nepalgunj', country: 'Nepal', province: 'Lumbini', image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5lcGFsJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { city: 'Jumla', country: 'Nepal', province: 'Karnali', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5lcGFsJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { city: 'Lukla', country: 'Nepal', province: 'Province 1', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5lcGFsJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' }
];

// Asian regions and their countries
const asianRegions = {
    'East Asia': ['China', 'Japan', 'South Korea', 'North Korea', 'Taiwan', 'Mongolia'],
    'Southeast Asia': ['Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'Myanmar', 'Cambodia', 'Laos', 'Brunei', 'Timor-Leste'],
    'South Asia': ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Bhutan', 'Maldives', 'Afghanistan'],
    'Central Asia': ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'],
    'West Asia': ['Turkey', 'Iran', 'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Yemen', 'Iraq', 'Syria', 'Jordan', 'Lebanon', 'Israel', 'Palestine']
};

// Continents and their countries
const continents = {
    'Europe': ['United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Russia', 'Ukraine', 'Poland', 'Romania', 'Netherlands', 'Belgium', 'Sweden', 'Portugal', 'Greece', 'Czech Republic', 'Switzerland', 'Austria', 'Denmark', 'Finland', 'Norway', 'Ireland'],
    'North America': ['United States', 'Canada', 'Mexico', 'Cuba', 'Jamaica', 'Haiti', 'Dominican Republic', 'Costa Rica', 'Panama'],
    'South America': ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Ecuador', 'Venezuela', 'Bolivia', 'Uruguay', 'Paraguay'],
    'Africa': ['Egypt', 'Nigeria', 'South Africa', 'Kenya', 'Ethiopia', 'Tanzania', 'Morocco', 'Algeria', 'Tunisia', 'Ghana', 'Senegal'],
    'Oceania': ['Australia', 'New Zealand', 'Papua New Guinea', 'Fiji', 'Solomon Islands', 'Vanuatu']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadCities();
    setupEventListeners();
    setupNavigation();
    getUserLocation();
});

// Set up navigation between sections
function setupNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            pageSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding section
            const sectionId = button.dataset.section + '-section';
            document.getElementById(sectionId).classList.add('active');
            
            // Hide forecast container when switching sections
            forecastContainer.classList.add('hidden');
        });
    });
    
    // Set up province buttons
    const provinceButtons = document.querySelectorAll('.province-button');
    provinceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all province buttons
            provinceButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show cities for selected province
            const province = button.dataset.province;
            showProvinceCities(province);
        });
    });
    
    // Set up region buttons
    const regionButtons = document.querySelectorAll('.region-button');
    regionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all region buttons
            regionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show cities for selected region
            const region = button.dataset.region;
            showRegionCities(region);
        });
    });
    
    // Set up continent buttons
    const continentButtons = document.querySelectorAll('.continent-button');
    continentButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all continent buttons
            continentButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show cities for selected continent
            const continent = button.dataset.continent;
            showContinentCities(continent);
        });
    });
}

// Load cities from CSV file
async function loadCities() {
    try {
        const response = await fetch('asian_city_coordinates.csv');
        const data = await response.text();
        
        // Parse CSV data
        const rows = data.split('\n').slice(1); // Skip header row
        
        cities = rows.map(row => {
            const columns = row.split(',');
            return {
                latitude: parseFloat(columns[0]),
                longitude: parseFloat(columns[1]),
                city: columns[2],
                country: columns[3],
                province: columns[4] || '' // New province field
            };
        }).filter(city => city.city && city.country); // Filter out any invalid entries
        
        // Sort cities alphabetically by country then city
        cities.sort((a, b) => {
            if (a.country === b.country) {
                return a.city.localeCompare(b.city);
            }
            // Prioritize Nepal at the top
            if (a.country === 'Nepal') return -1;
            if (b.country === 'Nepal') return 1;
            return a.country.localeCompare(b.country);
        });
        
        // Populate city dropdown (if it exists in this layout)
        populateCityDropdown();
        
        // Populate popular cities
        populatePopularCities();
        
        // Initialize the first province, region, and continent if buttons exist
        initializeSelectors();
    } catch (error) {
        console.error('Error loading cities:', error);
        showError();
    }
}

// Initialize selectors for provinces, regions, and continents
function initializeSelectors() {
    // Initialize first province if province buttons exist
    const provinceButtons = document.querySelectorAll('.province-button');
    if (provinceButtons.length > 0) {
        provinceButtons[0].classList.add('active');
        const firstProvince = provinceButtons[0].dataset.province;
        showProvinceCities(firstProvince);
    }
    
    // Initialize first region if region buttons exist
    const regionButtons = document.querySelectorAll('.region-button');
    if (regionButtons.length > 0) {
        regionButtons[0].classList.add('active');
        const firstRegion = regionButtons[0].dataset.region;
        showRegionCities(firstRegion);
    }
    
    // Initialize first continent if continent buttons exist
    const continentButtons = document.querySelectorAll('.continent-button');
    if (continentButtons.length > 0) {
        continentButtons[0].classList.add('active');
        const firstContinent = continentButtons[0].dataset.continent;
        showContinentCities(firstContinent);
    }
}

// Populate city dropdown with options
function populateCityDropdown() {
    // Check if citySelect exists in the new layout
    if (!citySelect) {
        console.log('City select dropdown not found in this layout');
        return;
    }
    
    // Group cities by country
    const countriesMap = {};
    
    cities.forEach(city => {
        if (!countriesMap[city.country]) {
            countriesMap[city.country] = [];
        }
        countriesMap[city.country].push(city);
    });
    
    // Create option groups for each country
    Object.keys(countriesMap).sort((a, b) => {
        // Prioritize Nepal at the top
        if (a === 'Nepal') return -1;
        if (b === 'Nepal') return 1;
        return a.localeCompare(b);
    }).forEach(country => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = country;
        
        // For Nepal, group by province
        if (country === 'Nepal') {
            // Group by province
            const provinceMap = {};
            
            countriesMap[country].forEach(city => {
                if (!provinceMap[city.province]) {
                    provinceMap[city.province] = [];
                }
                provinceMap[city.province].push(city);
            });
            
            // Create nested optgroups for provinces
            Object.keys(provinceMap).sort().forEach(province => {
                const provinceOptgroup = document.createElement('optgroup');
                provinceOptgroup.label = `${province}`;
                provinceOptgroup.style.paddingLeft = '10px';
                
                provinceMap[province].sort((a, b) => a.city.localeCompare(b.city)).forEach(city => {
                    const option = document.createElement('option');
                    option.value = `${city.latitude},${city.longitude}`;
                    option.textContent = city.city;
                    provinceOptgroup.appendChild(option);
                });
                
                optgroup.appendChild(provinceOptgroup);
            });
        } else {
            // For other countries, just list cities
            countriesMap[country].sort((a, b) => a.city.localeCompare(b.city)).forEach(city => {
                const option = document.createElement('option');
                option.value = `${city.latitude},${city.longitude}`;
                option.textContent = city.city;
                optgroup.appendChild(option);
            });
        }
        
        citySelect.appendChild(optgroup);
    });
}

// Populate popular cities
function populatePopularCities() {
    // Check if popularCitiesGrid exists in the new layout
    if (!popularCitiesGrid) {
        console.log('Popular cities grid not found in this layout');
        return;
    }
    
    popularCitiesGrid.innerHTML = '';
    
    popularCities.forEach(popularCity => {
        const cityData = cities.find(c => 
            c.city === popularCity.city && 
            c.country === popularCity.country
        );
        
        if (cityData) {
            const card = document.createElement('div');
            card.className = 'popular-city-card';
            card.dataset.lat = cityData.latitude;
            card.dataset.lon = cityData.longitude;
            
            card.innerHTML = `
                <img src="${popularCity.image}" alt="${popularCity.city}" class="city-image">
                <div class="city-info">
                    <h4>${popularCity.city}</h4>
                    <p class="city-country">${popularCity.country}, ${popularCity.province}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                const lat = parseFloat(card.dataset.lat);
                const lon = parseFloat(card.dataset.lon);
                const selectedCity = cities.find(city => 
                    city.latitude === lat && 
                    city.longitude === lon
                );
                
                if (selectedCity) {
                    fetchWeatherForecast(selectedCity);
                }
            });
            
            popularCitiesGrid.appendChild(card);
        }
    });
}

// Set up tab navigation
function setupTabNavigation() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
            
            // Hide forecast container when switching sections
            forecastContainer.classList.add('hidden');
        });
    });
    
    // Set up province buttons
    const provinceButtons = document.querySelectorAll('.province-button');
    provinceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all province buttons
            provinceButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show cities for selected province
            const province = button.dataset.province;
            showProvinceCities(province);
        });
    });
}

// Show cities for selected province
function showProvinceCities(province) {
    // Check if provinceCitiesContainer exists in the new layout
    if (!provinceCitiesContainer) {
        console.log('Province cities container not found in this layout');
        return;
    }
    
    const provinceCities = cities.filter(city => 
        city.country === 'Nepal' && 
        city.province === province
    );
    
    if (provinceCities.length > 0) {
        provinceCitiesContainer.innerHTML = '';
        
        const cityGrid = document.createElement('div');
        cityGrid.className = 'city-grid';
        
        provinceCities.sort((a, b) => a.city.localeCompare(b.city)).forEach(city => {
            const cityCard = document.createElement('div');
            cityCard.className = 'city-card';
            cityCard.dataset.lat = city.latitude;
            cityCard.dataset.lon = city.longitude;
            
            cityCard.innerHTML = `
                <p class="city-name">${city.city}</p>
            `;
            
            cityCard.addEventListener('click', () => {
                const lat = parseFloat(cityCard.dataset.lat);
                const lon = parseFloat(cityCard.dataset.lon);
                const selectedCity = cities.find(c => 
                    c.latitude === lat && 
                    c.longitude === lon
                );
                
                if (selectedCity) {
                    fetchWeatherForecast(selectedCity);
                }
            });
            
            cityGrid.appendChild(cityCard);
        });
        
        provinceCitiesContainer.appendChild(cityGrid);
    } else {
        provinceCitiesContainer.innerHTML = `
            <p class="province-instruction">No cities found for ${province}</p>
        `;
    }
}

// Show cities for selected region
function showRegionCities(region) {
    // Check if regionCitiesContainer exists in the new layout
    if (!regionCitiesContainer) {
        console.log('Region cities container not found in this layout');
        return;
    }
    
    const regionCountries = asianRegions[region] || [];
    
    const regionCities = cities.filter(city => 
        regionCountries.includes(city.country)
    );
    
    if (regionCities.length > 0) {
        regionCitiesContainer.innerHTML = '';
        
        const cityGrid = document.createElement('div');
        cityGrid.className = 'city-grid';
        
        // Group cities by country
        const countriesMap = {};
        
        regionCities.forEach(city => {
            if (!countriesMap[city.country]) {
                countriesMap[city.country] = [];
            }
            countriesMap[city.country].push(city);
        });
        
        // Create a section for each country
        Object.keys(countriesMap).sort().forEach(country => {
            const countrySection = document.createElement('div');
            countrySection.className = 'country-section';
            
            const countryHeader = document.createElement('h4');
            countryHeader.textContent = country;
            countrySection.appendChild(countryHeader);
            
            const countryCities = document.createElement('div');
            countryCities.className = 'city-grid';
            
            countriesMap[country].sort((a, b) => a.city.localeCompare(b.city)).forEach(city => {
                const cityCard = document.createElement('div');
                cityCard.className = 'city-card';
                cityCard.dataset.lat = city.latitude;
                cityCard.dataset.lon = city.longitude;
                
                cityCard.innerHTML = `
                    <p class="city-name">${city.city}</p>
                `;
                
                cityCard.addEventListener('click', () => {
                    const lat = parseFloat(cityCard.dataset.lat);
                    const lon = parseFloat(cityCard.dataset.lon);
                    const selectedCity = cities.find(c => 
                        c.latitude === lat && 
                        c.longitude === lon
                    );
                    
                    if (selectedCity) {
                        fetchWeatherForecast(selectedCity);
                    }
                });
                
                countryCities.appendChild(cityCard);
            });
            
            countrySection.appendChild(countryCities);
            cityGrid.appendChild(countrySection);
        });
        
        regionCitiesContainer.appendChild(cityGrid);
    } else {
        regionCitiesContainer.innerHTML = `
            <p class="region-instruction">No cities found for ${region}</p>
        `;
    }
}

// Show cities for selected continent
function showContinentCities(continent) {
    // Check if continentCitiesContainer exists in the new layout
    if (!continentCitiesContainer) {
        console.log('Continent cities container not found in this layout');
        return;
    }
    
    const continentCountries = continents[continent] || [];
    
    const continentCities = cities.filter(city => 
        continentCountries.includes(city.country)
    );
    
    if (continentCities.length > 0) {
        continentCitiesContainer.innerHTML = '';
        
        const cityGrid = document.createElement('div');
        cityGrid.className = 'city-grid';
        
        // Group cities by country
        const countriesMap = {};
        
        continentCities.forEach(city => {
            if (!countriesMap[city.country]) {
                countriesMap[city.country] = [];
            }
            countriesMap[city.country].push(city);
        });
        
        // Create a section for each country
        Object.keys(countriesMap).sort().forEach(country => {
            const countrySection = document.createElement('div');
            countrySection.className = 'country-section';
            
            const countryHeader = document.createElement('h4');
            countryHeader.textContent = country;
            countrySection.appendChild(countryHeader);
            
            const countryCities = document.createElement('div');
            countryCities.className = 'city-grid';
            
            countriesMap[country].sort((a, b) => a.city.localeCompare(b.city)).forEach(city => {
                const cityCard = document.createElement('div');
                cityCard.className = 'city-card';
                cityCard.dataset.lat = city.latitude;
                cityCard.dataset.lon = city.longitude;
                
                cityCard.innerHTML = `
                    <p class="city-name">${city.city}</p>
                `;
                
                cityCard.addEventListener('click', () => {
                    const lat = parseFloat(cityCard.dataset.lat);
                    const lon = parseFloat(cityCard.dataset.lon);
                    const selectedCity = cities.find(c => 
                        c.latitude === lat && 
                        c.longitude === lon
                    );
                    
                    if (selectedCity) {
                        fetchWeatherForecast(selectedCity);
                    }
                });
                
                countryCities.appendChild(cityCard);
            });
            
            countrySection.appendChild(countryCities);
            cityGrid.appendChild(countrySection);
        });
        
        continentCitiesContainer.appendChild(cityGrid);
    } else {
        continentCitiesContainer.innerHTML = `
            <p class="continent-instruction">No cities found for ${continent}</p>
        `;
    }
}

// Get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                findNearestCity(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                currentLocationSection.classList.add('hidden');
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser');
        currentLocationSection.classList.add('hidden');
    }
}

// Find the nearest city to user's location
function findNearestCity(userLat, userLon) {
    // Calculate distance between two points using Haversine formula
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in km
    }
    
    // Find the nearest city
    let nearestCity = null;
    let minDistance = Infinity;
    
    cities.forEach(city => {
        const distance = getDistance(userLat, userLon, city.latitude, city.longitude);
        if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
        }
    });
    
    if (nearestCity) {
        // Show current location section
        currentLocationSection.classList.remove('hidden');
        
        // Fetch weather for nearest city
        fetchLocationWeather(nearestCity);
    }
}

// Fetch weather for user's location
async function fetchLocationWeather(city) {
    try {
        // 7Timer API URL
        const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${city.longitude}&lat=${city.latitude}&product=civillight&output=json`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Display the location forecast
        displayLocationForecast(city, data);
    } catch (error) {
        console.error('Error fetching location weather data:', error);
        currentLocationSection.classList.add('hidden');
    }
}

// Display forecast for user's location
function displayLocationForecast(city, data) {
    locationForecastContainer.innerHTML = '';
    
    if (data.dataseries && data.dataseries.length > 0) {
        // Get today's weather
        const today = data.dataseries[0];
        
        // Get weather condition
        const weatherCode = today.weather.toLowerCase();
        const weather = weatherConditions[weatherCode] || { 
            description: 'Unknown weather conditions', 
            icon: 'cloudy.png',
            theme: 'theme-cloudy'
        };
        
        // Create location forecast card
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.style.margin = '0 auto';
        card.style.maxWidth = '300px';
        
        card.innerHTML = `
            <h3>${city.city}, ${city.country}</h3>
            <p>Today's Weather</p>
            <img src="images/${weather.icon}" alt="${weather.description}" class="forecast-icon">
            <div class="forecast-temp">${today.temp2m.max}°C</div>
            <div class="forecast-details">
                <p>${weather.description}</p>
                <p>${getTraditionalWindDescription(today.wind10m_max)}</p>
                <button class="view-full-forecast">View 7-Day Forecast</button>
            </div>
        `;
        
        // Add event listener to view full forecast button
        const viewFullBtn = card.querySelector('.view-full-forecast');
        viewFullBtn.addEventListener('click', () => {
            fetchWeatherForecast(city);
        });
        
        locationForecastContainer.appendChild(card);
    } else {
        currentLocationSection.classList.add('hidden');
    }
}

// Set up event listeners
function setupEventListeners() {
    // Only add event listeners if elements exist
    if (refreshLocationBtn) {
        refreshLocationBtn.addEventListener('click', getUserLocation);
    }
    
    // The dropdown and get forecast button may not exist in the new layout
    if (getForecastBtn && citySelect) {
        getForecastBtn.addEventListener('click', handleGetForecast);
        
        // Allow pressing Enter in the select to get forecast
        citySelect.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                handleGetForecast();
            }
        });
    }
}

// Handle get forecast button click
function handleGetForecast() {
    const selectedValue = citySelect.value;
    
    if (!selectedValue) {
        alert('Please select a city from the dropdown menu to view the weather forecast.');
        return;
    }
    
    const [latitude, longitude] = selectedValue.split(',');
    const selectedCity = cities.find(city => 
        city.latitude === parseFloat(latitude) && 
        city.longitude === parseFloat(longitude)
    );
    
    if (selectedCity) {
        fetchWeatherForecast(selectedCity);
    }
}

// Fetch weather forecast from 7Timer API
async function fetchWeatherForecast(city) {
    // Show loading indicator and hide other sections
    loadingSection.classList.remove('hidden');
    errorSection.classList.add('hidden');
    forecastContainer.classList.add('hidden');
    
    try {
        // 7Timer API URL
        // product=civillight gives us a 7-day forecast with daily values
        const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${city.longitude}&lat=${city.latitude}&product=civillight&output=json`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Display the forecast data
        displayForecast(city, data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    } finally {
        // Hide loading indicator
        loadingSection.classList.add('hidden');
    }
}

// Apply theme based on weather condition
function applyWeatherTheme(weatherCode) {
    // Remove any existing theme classes from body
    document.body.classList.forEach(className => {
        if (className.startsWith('theme-')) {
            document.body.classList.remove(className);
        }
    });
    
    // Get the theme for the current weather
    const weather = weatherConditions[weatherCode.toLowerCase()] || weatherConditions['cloudy'];
    
    // Apply the theme
    document.body.classList.add(weather.theme);
}

// Display forecast data
function displayForecast(city, data) {
    // Update city information
    cityNameElement.textContent = `${city.city}, ${city.country}`;
    cityCoordinatesElement.textContent = `Latitude: ${city.latitude.toFixed(2)}, Longitude: ${city.longitude.toFixed(2)}`;
    
    // Clear previous forecast cards
    forecastCardsContainer.innerHTML = '';
    
    // Check if dataseries exists and has data
    if (data.dataseries && data.dataseries.length > 0) {
        // Get the current day's weather for theming
        const currentDayWeather = data.dataseries[0].weather.toLowerCase();
        
        // Apply theme based on current day's weather
        applyWeatherTheme(currentDayWeather);
        
        // Create a card for each day in the forecast (up to 7 days)
        data.dataseries.slice(0, 7).forEach(day => {
            const card = createForecastCard(day);
            forecastCardsContainer.appendChild(card);
        });
        
        // Show forecast container
        forecastContainer.classList.remove('hidden');
        
        // Scroll to forecast container
        forecastContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        showError();
    }
}

// Create a forecast card for a single day
function createForecastCard(day) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    // Format date (YYYYMMDD to readable format)
    const dateString = day.date.toString();
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const dayOfMonth = dateString.substring(6, 8);
    const date = new Date(year, month - 1, dayOfMonth);
    
    // Get day name
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[date.getDay()];
    
    // Get traditional day name
    const traditionalDayName = traditionalDays[date.getDay()];
    
    // Format date as "Day, Month Day"
    const formattedDate = `${dayName}, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    
    // Get weather condition
    const weatherCode = day.weather.toLowerCase();
    const weather = weatherConditions[weatherCode] || { 
        description: 'Unknown weather conditions', 
        icon: 'cloudy.png', // Default icon
        theme: 'theme-cloudy'
    };
    
    // Get temperature values directly
    const tempC = day.temp2m.max; // Access the max temperature
    const tempMin = day.temp2m.min; // Access the min temperature
    
    // Create card content with traditional elements and enhanced descriptions
    card.innerHTML = `
        <div class="forecast-date">${traditionalDayName}</div>
        <div class="forecast-date-en">${formattedDate}</div>
        <img src="images/${weather.icon}" alt="${weather.description}" class="forecast-icon">
        <div class="forecast-temp">${tempC}°C</div>
        <div class="forecast-details">
            <p><strong>High/Low:</strong> ${tempC}°C / ${tempMin}°C</p>
            <p>${weather.description}</p>
            <p>${getTraditionalWindDescription(day.wind10m_max)}</p>
        </div>
    `;
    
    return card;
}

// Get wind description based on wind speed with traditional terms
function getTraditionalWindDescription(windSpeed) {
    if (windSpeed <= 1) return 'Wind: Calm - Perfect for meditation';
    if (windSpeed <= 3) return 'Wind: Gentle - Pleasant for walking';
    if (windSpeed <= 5) return 'Wind: Moderate - May affect light items';
    if (windSpeed <= 7) return 'Wind: Strong - Secure loose objects';
    return 'Wind: Very Strong - Exercise caution outdoors';
}

// Get wind description based on wind speed
function getWindDescription(windSpeed) {
    if (windSpeed <= 1) return 'Calm';
    if (windSpeed <= 3) return 'Light';
    if (windSpeed <= 5) return 'Moderate';
    if (windSpeed <= 7) return 'Strong';
    return 'Very Strong';
}

// Show error message
function showError() {
    errorSection.classList.remove('hidden');
    forecastContainer.classList.add('hidden');
}