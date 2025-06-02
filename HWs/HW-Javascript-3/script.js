class Marker
{
    color;
    ink = 100;

    get color () { return this.color; }
    get ink () { return this.ink; }

    constructor(color)
    {
        this.color = color || "Black";
    }

    draw(text)
    {
        var result = `<span style="color: ${this.color}">`;
        for(let i of text)
        {
            if(i != ' ') this.ink -= 0.5;
            if(this.ink == 0)
            {
                console.log("The ink container is empty");
                break;
            }
            result += i;
        }
        result += "</span><br/><br/>";
        board.innerHTML += result;
        console.log(`Marker's ink: ${this.ink}%`);
    }
}

class RefillableMarker extends Marker
{
    refill(ink)
    {
        this.ink += ink;
        if(this.ink > 100) this.ink = 100;
        if(this.ink < 0) this.ink = 0;
    }
}

const board = document.getElementById("board");
if(!board) throw "Element #board is not accessible";

var marker1 = new Marker("Red");

board.innerHTML += "Short text<br/>";
marker1.draw("The is some text I have come up with just now");

board.innerHTML += "Longer text when the ink goes empty<br/>";
marker1.draw("Newton built the first reflecting telescope and developed a sophisticated theory of colour based on the observation that a prism separates white light into the colours of the visible spectrum. His work on light was collected in his book Opticks, published in 1704. He originated prisms as beam expanders and multiple-prism arrays, which would later become integral to the development of tunable lasers.[10] He also anticipated wave–particle duality and was the first to theorize the Goos–Hänchen effect. He further formulated an empirical law of cooling, which was the first heat transfer formulation and serves as the formal basis of convective heat transfer,[11] made the first theoretical calculation of the speed of sound, and introduced the notions of a Newtonian fluid and a black body. He was also the first to explain the Magnus effect. Furthermore, he made early studies into electricity. In addition to his creation of calculus, Newton's work on mathematics was extensive. He generalized the binomial theorem to any real number, introduced the Puiseux series, was the first to state Bézout's theorem, classified most of the cubic plane curves, contributed to the study of Cremona transformations, developed a method for approximating the roots of a function, and also originated the Newton–Cotes formulas for numerical integration. He further initiated the field of calculus of variations, devised an early form of regression analysis, and was a pioneer of vector analysis.");

board.innerHTML += "<br/>-------------<br/>Long text with refillable marker<br/>";
var marker2 = new RefillableMarker("Green");
marker2.draw(`In physical terms, the divergence of a vector field is the extent to which the vector field flux behaves like a source or a sink at a given point. It is a local measure of its "outgoingness" – the extent to which there are more of the field vectors exiting from an infinitesimal region of space than entering it. A point at which the flux is outgoing has positive divergence, and is often called a "source" of the field. A point at which the flux is directed inward has negative divergence, and is often called a "sink" of the field. The greater the flux of field through a small surface enclosing a given point, the greater the value of divergence at that point. A point at which there is zero flux through an enclosing surface has zero divergence.`);

board.innerHTML += "<br/>Now refill<br/>";
marker2.refill(90);
marker2.draw("The divergence of a vector field F(x) at a point x0 is defined as the limit of the ratio of the surface integral of F out of the closed surface of a volume V enclosing x0 to the volume of V, as V shrinks to zero");