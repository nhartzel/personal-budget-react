
function HomePage() {
  return (
    <main className="center" id="main">

        <div className="page-area">

            <article>

                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>

                <h2>Live Budgeting Alerts</h2>
                <p>
                    To make sure you always have the right information as soon as you need it, we provide 
                    immediate alerts when you've exceeded your budget in any category. 
                </p>
            </article>
    
            <article>
                <h2>Results</h2>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>

                <h2>Free, Fast, and Secure!</h2>
                <p>
                    Not only is this app completely free, but we do not store any of your personal data. 
                    Save money and sleep soundly knowing we've got your back!
                </p>
            </article>
    
            <article>
                <h2>Stay on track</h2>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h2>Alerts</h2>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h2>Chart</h2>
                <p>
                    <canvas id="myChart" width="400" height="400" aria-label="A pie chart displaying your budget information"></canvas>
                </p>
            </article>

        </div>

            <h2>Other Chart</h2>
            <div id="d3-chart"></div>


    </main>
  );
}

export default HomePage;
