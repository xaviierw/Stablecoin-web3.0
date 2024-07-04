document.getElementById('stablecoin-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const stablecoinInput = document.getElementById('stablecoin').value.toLowerCase().trim();
    showLoadingScreen(stablecoinInput);
});

function showLoadingScreen(stablecoinInput) {
    const formContainer = document.querySelector('.form-container');
    const loadingContainer = document.getElementById('loading-container');
    const progressBar = document.getElementById('progress-bar');
    const progressBarInner = document.getElementById('progress-bar-inner');
    const loadingText = document.getElementById('loading-text');
    const resultDiv = document.getElementById('result');
    const infoContainer = document.getElementById('info-container');
    const submitButton = document.querySelector('button[type="submit"]');
    const backButton = document.querySelector('.back-button');
    const mintedInfoTitle = document.getElementById('minted-info-title');

    // Update the title based on the selected stablecoin
    const stablecoinNames = {
        'tether': 'USDT',
        'usd-coin': 'USDC',
        'dai': 'DAI'
    };

    mintedInfoTitle.textContent = `Minted Information for ${stablecoinNames[stablecoinInput]}`;

    formContainer.style.display = 'none';
    loadingContainer.style.display = 'flex';
    progressBar.style.display = 'block';
    loadingText.style.display = 'block';
    submitButton.disabled = true;

    // Trigger reflow
    progressBarInner.style.width = '0'; // Set initial width
    progressBarInner.offsetHeight; // Trigger a reflow
    progressBarInner.style.animation = 'loading 5s linear forwards';

    const loadingMessages = [
        `Fetching ${stablecoinNames[stablecoinInput]} info from Ethereum mainnet...`,
        `Fetching ${stablecoinNames[stablecoinInput]} info from Tron mainnet...`
    ];

    let messageIndex = 0;
    loadingText.textContent = loadingMessages[messageIndex];

    const loadingInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[messageIndex];
    }, 2500);

    // Simulate delay to showcase loading state (5 seconds)
    setTimeout(() => {
        clearInterval(loadingInterval);
        try {
            // Example time series data for the chart
            const timeSeriesData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'Minted on Ethereum',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        data: [1200, 1300, 1250, 1400, 1350, 1500] // Example data
                    },
                    {
                        label: 'Minted on Tron',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        data: [1100, 1150, 1200, 1250, 1300, 1350] // Example data
                    },
                    {
                        label: 'Total Collateral',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        data: [2300, 2450, 2550, 2650, 2750, 2850] // Example data
                    }
                ]
            };

            // Display chart using Chart.js
            const ctx = document.getElementById('collateralChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: timeSeriesData,
                options: {
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Example minted and custodian data
            const data = {
                'tether': {
                    minted: {
                        ethereum: {
                            minted: 2000,
                            blockchainNumber: '0x1234...abcd'
                        },
                        tron: {
                            minted: 1800,
                            blockchainNumber: '0x5678...efgh'
                        },
                        totalMinted: 3800
                    },
                    custodian: {
                        a: {
                            cash: '$101,010,010,000',
                            crypto: '$303,000,000'
                        },
                        b: {
                            corpBond: '$100,000,000',
                            usBond: '$100,000,000'
                        },
                        totalCollateral: '$101,513,010,000'
                    }
                },
                'usd-coin': {
                    minted: {
                        ethereum: {
                            minted: 1500,
                            blockchainNumber: '0x9abc...def0'
                        },
                        tron: {
                            minted: 1400,
                            blockchainNumber: '0x1234...5678'
                        },
                        totalMinted: 2900
                    },
                    custodian: {
                        a: {
                            cash: '$50,000,000,000',
                            crypto: '$150,000,000'
                        },
                        b: {
                            corpBond: '$80,000,000',
                            usBond: '$120,000,000'
                        },
                        totalCollateral: '$50,350,000,000'
                    }
                },
                'dai': {
                    minted: {
                        ethereum: {
                            minted: 3000,
                            blockchainNumber: '0x9876...5432'
                        },
                        tron: {
                            minted: 2700,
                            blockchainNumber: '0x5678...1234'
                        },
                        totalMinted: 5700
                    },
                    custodian: {
                        a: {
                            cash: '$75,000,000,000',
                            crypto: '$200,000,000'
                        },
                        b: {
                            corpBond: '$50,000,000',
                            usBond: '$100,000,000'
                        },
                        totalCollateral: '$75,350,000,000'
                    }
                }
            };

            const selectedData = data[stablecoinInput];

            // Populate minted information
            document.getElementById('eth-minted').textContent = selectedData.minted.ethereum.minted;
            document.getElementById('eth-blockchain-number').textContent = selectedData.minted.ethereum.blockchainNumber;
            document.getElementById('tron-minted').textContent = selectedData.minted.tron.minted;
            document.getElementById('tron-blockchain-number').textContent = selectedData.minted.tron.blockchainNumber;
            document.getElementById('total-minted').textContent = selectedData.minted.totalMinted;

            // Populate custodian information
            document.getElementById('custodian-a-cash').textContent = selectedData.custodian.a.cash;
            document.getElementById('custodian-a-crypto').textContent = selectedData.custodian.a.crypto;
            document.getElementById('custodian-b-corp-bond').textContent = selectedData.custodian.b.corpBond;
            document.getElementById('custodian-b-us-bond').textContent = selectedData.custodian.b.usBond;
            document.getElementById('total-collateral-value').textContent = selectedData.custodian.totalCollateral;

            // Hide loading container and show result container
            loadingContainer.style.display = 'none';
            resultDiv.style.display = 'flex';
            infoContainer.style.display = 'flex'; // Show info container
            backButton.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            loadingText.textContent = 'An error occurred. Please try again.';
        } finally {
            submitButton.disabled = false;
        }
    }, 5000);
}
