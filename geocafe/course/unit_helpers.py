from django.contrib.auth.models import User
from course.models import Units, Topics, Badges

# this file is not meant to be executed, it's just a helper file with the functions to insert the units and topics to the database, 
# the code can be executed into a special view specifically for superusers, the vies is called "insertions" in the views.py file

class Insertions:
    def insert_unit_1_full():
        unit1, created = Units.objects.get_or_create(level=1, name="Unit 1. Introduction to computational geometry.", description="This is the first unit.")
        if created:
            print("The unit 1 was created successfully.")
        else:
            print("The unit 1 already exists.")
        topic1, created = Topics.objects.get_or_create(unit=unit1, name="""<p><strong><em>Topic 1 - What is computational geometry?</em></strong></p>""", content="""<p>It’s referred to as a field of <strong>computer science and geometry</strong>, having the main function of designing and analyzing computer algorithms related to solving geometric problems.</p>

<p>Modern computational geometry can be used as a way to solve two and three dimensional problems, but the term is mostly used in the context of two dimensions, and that's the one we will oblige in this course.</p>

<p>We can make a direct connection between computer science as there are many fields of computer science that deal with solving problems of a geometric nature. These include computer graphics, robotics, and geographic information systems (GIS).</p>

<p>To address this challenge, computational geometry swoops in, offering a toolbox of fundamental geometric solutions that these applications can leverage to build their programs.</p>

<p><strong><em>Given our specific case of study we will try to center this course in the computer graphics field, looking for a smooth and accessible learning for most people.</em></strong></p>
""")
        if created:
            print("The topic 1 was created successfully.")
        else:
            print("The topic 1 already exists.")
            
        topic2, created = Topics.objects.get_or_create(unit=unit1, name="""<p><strong><em>Topic 2 - Application areas.</em></strong></p>""", content="""<p>As we stated, computational geometry can offer solutions in a variety of areas (fields of computer science), using multiple geometric solutions that can be adapted depending on the problem at hand; In this topic we will briefly talk about computational geometry in these areas.</p>

<p style="text-align:center"><strong>Computer graphics.</strong></p>

<p>Most of the problems in the scope of computational geometry are inspired in computer graphics, a discipline which uses computational geometry as a way to represent, manipulate and render 2D and 3D graphics, this covering elements such as lines, segments and planes (this last ones being essential for 3D scenes).</p>

<p>One of the most fundamental problems in computer graphics is the construction of a polygonal mesh representation of a 3D object. Process that involves the conversion of the object’s surface into a mesh of interconnected triangles; Problem that can be rendered with modern graphics hardware.</p>

<p>Some algorithms we can mention are: </p>

<p>The Delaunay triangulation, which computes a triangulation of a set of points that maximizes the minimum angle of the resulting triangles.</p>

<p>The Voronoi Diagrams, which partition a plane into regions based on the distance to a set of points, are used to construct polygonal meshes.</p>

<p style="text-align:center"><strong>Robotics.</strong></p>

<p>When talking about robotics some words that come to mind are motion planning and collision detection, problems that find their solution with the use of computational geometry’s  algorithms.</p>

<p>Imagine a robot trying to get from one spot to another in its work area. To avoid bumping into things, it needs to find a safe path without obstacles. In a robot’s workspace, the paths  without reaching a collision are calculated using computational geometry techniques like  the “<strong>Visibility Graph Algorithm</strong>” and the “<strong>Rapidly-exploring Random Tree (RRT)</strong>” algorithm.</p>

<p>Computational geometry algorithms are also used in a robot’s grasping and object manipulation abilities. As for a robot to manage an object it needs to determine the best way to reach for it and calculate an angle to grip it. This can be determined using the “<strong>Convex Hull</strong>” algorithm which computes the smallest convex polygon that contains a set of points, and the “<strong>Grasp Quality Metrics</strong>” algorithm, which computes the quality of a grasp based on the geometry of the object and the robot’s hand.</p>

<p><em>Something important to note is that the aforementioned algorithms are complex algorithms, therefore not designed to be easily understandable.</em></p>

<p style="text-align:center"><strong>Geographic information systems.</strong></p>

<p>A geographic information system (GIS) can be seen as a system of hardware, software and procedures designed to support the capture, management, analysis, modeling and display of spatially referenced data related to geography.</p>

<p>Computational geometry is used in all stages of a GIS data cycle. Geometric algorithms are used in the process of data correction (after data acquisition and input), data retrieval (through the use of queries), data analysis (map overlays and geostatistics), and data visualization (creation of maps and animations). For instance, line segment intersection by plane sweep solves map overlay (complete implementation of primitive maps), Voronoi diagrams are helpful in neighborhood analysis (analysis of relationships between locations), Delaunay triangulations are widely used for terrain modeling, and geometric data structures help with efficient spatial indexing in large spatial data sets.</p>
""")
        if created:
            print("The topic 2 was created successfully.")
        else:
            print("The topic 2 already exists.")
    
        topic3, created = Topics.objects.get_or_create(unit=unit1, name="""<p><strong><em>Topic 3 - Strengths and Limitations.</em></strong></p>""", content="""<p>Computational geometry as a complete discipline has its right share of specific characteristics that can be considered Strengths and Limitations, this topic will cover some stipulated ones.</p>

<p style="text-align:center"><strong>Strengths.</strong></p>

<p><strong><em>Development of Geometric tools:</em></strong> Prior to computational geometry, the available solutions to computational geometry problems were made with a sole purpose in mind with use of limited rigor, ending up with some efficient, some inefficient and some correct and some directly incorrect tools. Computational geometry came to bring mathematical rigor, providing exact and efficient solutions to existing problems and future problems to come.</p>

<p><strong><em>Emphasis on probable evidence:</em></strong> Prior to the development of computational geometry little was understood about the computational complexity of many geometric computations. This developed problems in which systems had to be excessively simplified to cope with computer requirements (due to poor efficiency of the methods), thus generating systems that could be hardly understandable and easily bypassed.</p>

<p>Computational geometry puts such questions on the firm grounding of asymptotic complexity, and in some cases it has been possible to prove that algorithms discovered in this area are optimal solutions.</p>

<p><strong><em>Emphasis on Correctness/Robustness:</em></strong> Prior to the development of computational geometry, many of the software systems that were developed were troubled by bugs arising from the confluence of the continuous nature of geometry and the discrete nature of computation. This happened because a program can use different ways of making the same thing, and can interact in distinct ways depending on the circumstance, so without a proper line to follow this was prone to happen in most cases.</p>

<p>Computational geometry brings the use of solid mathematical foundations that establish rules and give consensus on how graphical things can be made.</p>

<p style="text-align:center"><strong>Limitations.</strong></p>

<p><strong><em>Emphasis on discrete geometry:</em></strong> Computational geometry can never fully address the needs in all the apps that are used, a reason for this is the discrete nature of computational geometry (objects have known and definable boundaries), hence is not useful with continuous geometry problems. There are many applications in which objects are of a very continuous nature: computational physics, computational fluid dynamics, motion planning.</p>

<p><strong><em>Emphasis on flat objects:</em></strong> Another limitation is the fact that computational geometry deals primarily with straight or flat objects that naturally have defined boundaries. Another issue is that proving the correctness and efficiency of an algorithm is only possible when all the computations are well defined. Many computations on continuous objects (Solving differential and integral equations) cannot guarantee that their results are correct nor that they converge in a specified amount of time.</p>

<p><em>Something to note is that there are some ways to approximate curved objects, something that serves as a hoop to solve a lot of problems without having to resolve numerical issues.</em></p>

<p><strong><em>Emphasis on low-dimensional spaces:</em></strong> Computational geometry has focused mainly on 2D problems, and 3D problems to a limited extent. This makes most of the problems used in computational geometry easy to visualize but limits the solving of hard 3D problems and puts out of the question higher dimensional problems.</p>
""")
        if created:
            print("The topic 3 was created successfully.")
        else:
            print("The topic 3 already exists.")
    
    
    
    
    def insert_unit_2_full():
        unit2, created = Units.objects.get_or_create(level=2, name="Unit 2. Primitive Graphics.", description="This is the second unit.")
        if created:
            print("The unit 2 was created successfully.")
        else:
            print("The unit 2 already exists.")
        topic1, created = Topics.objects.get_or_create(unit=unit2, name="""<p><em>Topic 1 - Introduction to computer graphics.</em></p>""", content="""<p>
        Computer graphics are an essential tool in the production of pictures, representations of things that can be hard or laborious to make by traditional methods become easier and cheaper with the use of them.
    </p>
    <p>
        There is virtually no area in which graphical displays
    </p>
    <p>
    cannot be used to some advantage, and so it is not surprising to find the use of computer graphics so widespread. We can say that unlike old times, modern computer graphics are an accessible tool and everyone can learn the basics in some form or another.
    </p>
    <p>
        Something important to note is the enormous quantity of programs that can be used to create computer graphics without writing a line of code.
    </p>
    <p>
        One example of them are the <strong>CAD</strong> (computer-aided design) methods that are now routinely used in the design of buildings, automobiles, aircraft, watercraft, space-craft, computers, textiles, and many, many other products.
    </p>
    <p>
        Another example is the famous “mspaint”, where one can draw with a cursor as if it were a pencil, and make detailed digital images despite being a casual user.
    </p>
    <p>
    
    </p>
    <p>
        But there are ways of making computer graphics with some implementations in most programming languages, being those the predecessor of the aforementioned programs.
    </p>
    <p>
        <em>In this unit we will use the graphics intended libraries of the C programming language, being this a perfect way of learning the primitive graphics theme and make use of the computational geometry algorithms.</em>
    </p>
""")
        if created:
            print("The topic 1 was created successfully.")
        else:
            print("The topic 1 already exists.")
            
        topic2, created = Topics.objects.get_or_create(unit=unit2, name="""<p><em>Topic 2 - Graphic libraries.</em></p>""", content="""<p>
        Graphics can be implemented with the use of the use of native libraries of the language in use, or implementation of an standard API like OpenGL (which can be used in multiple programming languages).
    </p>
    <p>
    Libraries provide us with the necessary tools to make graphic representations in a swift manner, with the correct use of them and the native functions of the language we can effectively prove the functionality of most computational geometry algorithms, and understand them step by step. 
    </p>
    <p>
    <em>The graphic library we will use is called “<strong>GRAPHICS.H</strong>”</em>
    </p>
    <p>
    <em>which we’ll include with the “<strong>#include &lt;graphics.h></strong>” instruction at the start of our code.</em>
    </p>
""")
        if created:
            print("The topic 2 was created successfully.")
        else:
            print("The topic 2 already exists.")
    
        topic3, created = Topics.objects.get_or_create(unit=unit2, name="""<p><em>Topic 3 - Primitive graphics.</em></p>""", content="""<p>
        Referred to fundamental elements in graphics, most of them are simple things like: lines, circles or squares; can also be a character or an operation in the digital "canvas" like filling (of certain color) or reflecting an image. C language has 5 primitive graphics groups:
    </p>
    <p>
    1 - <strong>Geometrical figures:</strong> functions that directly graph lines, circles, arcs, rectangles, polygons...
    </p>
    <p>
    2 - <strong>Filling:</strong> these functions have two ways of being made. The first one is with the use of polygons, where you define the vertices of the polygon you want to fill; the second one is a graphic operation that tries algorithmically to search for borders in a figure and fills it.
    </p>
    <p>
    3 - <strong>Rasterop:</strong> It is a graphics operation that copies a region of an image and then draws it in any region of the screen. 
    </p>
    <p>
    4 - <strong>Mathematical Graphs:</strong> Used to draw charts with primitive shapes like bars and sectors.
    </p>
    <p>
    5 - <strong>Graphic Text:</strong> Used to write text in graphics mode, using different fonts.
    </p>
    <p>
        <em>Something important to note is that when working with this graphics mode we are referring to the use of a screen resolution of 640x480, this meaning that we have 640 pixels in <strong>x</strong> and 420 pixels in <strong>y</strong> to use.</em>
    </p>
    <p>
        We have the next colors to our disposal, which we use when calling some functions or defining a default color:
    </p>
    <p>
    BLACK - 0
    </p>
    <p>
    BLUE - 1
    </p>
    <p>
    GREEN - 2
    </p>
    <p>
    CYAN - 3
    </p>
    <p>
    RED - 4
    </p>
    <p>
    MAGENTA - 5
    </p>
    <p>
    BROWN - 6
    </p>
    <p>
    LIGHTGRAY - 7
    </p>
    <p>
    DARKGRAY - 8
    </p>
    <p>
    LIGHTBLUE - 9
    </p>
    <p>
    LIGHTGREEN - 10
    </p>
    <p>
    LIGHTCYAN - 11
    </p>
    <p>
    LIGHTRED - 12
    </p>
    <p>
    LIGHTMAGENTA - 13
    </p>
    <p>
    YELLOW - 14
    </p>
    <p>
    WHITE - 15
    </p>
    <p>
        Colors can be defined with the use of their name or the number assigned to them.
    </p>
    <p>
    <strong>Entering the graphics mode</strong>
    </p>
    <p>
    <strong>	</strong>To load a graphics mode, Turbo C provides a series of files that allow us to install the video mode. These files have a BGI extension and represent the video mode you are going to work with (CGA, HERCULES, EGA). Unfortunately, since these programs are somewhat old, they do not include BGI files for VGA or SUPER VGA modes.
    </p>
    <p>
        The procedure that allows us to enter graphics mode is called <strong>INITGRAPH</strong> and requires the <strong>GRAPHICS.H</strong> library (included in the first line of our program). Let's see how it works:
    </p>
    <p>
    Syntax: initgraph(&numdriver, &modvideo, path);
    </p>
    <p>
    As you can see, the procedure needs 3 parameters. The first two are integers, and the third is a string. Let's see what they mean:
    </p>
    <p>
    <strong>- numdriver:</strong> A variable that contains the video mode we are going to use. We will use 3 (EGAVGA.BGI).
    </p>
    <p>
    <strong>- modvideo:</strong> 1 for Text Mode and 8 for Graphics Mode.
    </p>
    <p>
    <strong>- path:</strong> Specifies the directory where the graphics handler or the file with the BGI extension is located, typically in the BIN folder.
    </p>
    <p>
        Next is an example of how a code should look like:
    </p>
    <p>
    #include&lt;graphics.h>
    </p>
    <p>
    #include&lt;conio.h>
    </p>
    <p>
    void main()
    </p>
    <p>
    {
    </p>
    <p>
    int gd = DETECT, gm;
    </p>
    <p>
    initgraph(&gd, &gm, "c:\\tc\\bgi");
    </p>
    <p>
    cleardevice(); /* This function clears the screen*/
    </p>
    <p>
    /*code*/
    </p>
    <p>
    getch();
    </p>
    <p>
    closegraph();
    </p>
    <p>
    }
    </p>
""")
        if created:
            print("The topic 3 was created successfully.")
        else:
            print("The topic 3 already exists.")
    
    
        topic4, created = Topics.objects.get_or_create(unit=unit2, name="""<p><em>Topic 4 - Functions for managing graphic primitives</em></p>""", content="""<p>
        Here we’ll cover the basic functions for graphic management in the <strong>graphics.h</strong> library.
    </p>
    <p>
    -setbkcolor(<strong>color</strong>); 
    </p>
    <p>
    Using this function sets the background color. You can use any of the default colors (called with its name, number or a designated variable).
    </p>
    <p>
    -getbkcolor(void);
    </p>
    <p>
     This function returns the current background color in its numerical value.
    </p>
    <p>
    <strong><em>e.g.</em></strong>
    </p>
    <p>
    #include &lt;stdlib.h>
    </p>
    <p>
    #include &lt;conio.h>
    </p>
    <p>
    #include &lt;graphics.h>
    </p>
    <p>
    #include &lt;stdio.h>
    </p>
    <p>
    void main (void)
    </p>
    <p>
    {
    </p>
    <p>
    int adap=DETECT, mode, color;
    </p>
    <p>
    initgraph(&adap,&mode,"C:\\tc20\\bin ");
    </p>
    <p>
    cleardevice();
    </p>
    <p>
    <strong>setbkcolor(6);</strong>
    </p>
    <p>
    color=<strong>getbkcolor();</strong>
    </p>
    <p>
    getch();
    </p>
    <p>
    closegraph();
    </p>
    <p>
    }
    </p>
    <p>
    <strong>Attribute control functions.</strong>
    </p>
    <p>
    -setcolor(<strong>color</strong>);
    </p>
    <p>
    This function sets the color attribute, that is, it chooses a color between 0 and 15 its equivalent in English, everything you draw after this instruction will have the color set by the <strong>setcolor</strong> function.
    </p>
    <p>
    -setlinestyle(<strong>style</strong>,<strong>pattern</strong>,<strong>thickness</strong>);
    </p>
    <p>
     Sets the style and thickness attributes of the lines drawn by most drawing functions.
    </p>
    <p>
    The <strong>style</strong> parameter chooses one of several predefined styles such as dotted, dashed, etc.
    </p>
    <p>
    The <strong>thickness</strong> parameter selects a thickness between 1 and 3 bits.
    </p>
    <p>
    -getpixel(x, y); 
    </p>
    <p>
    Returns the value of the pixel that is at position (x, y).
    </p>
    <p>
    -getmaxcolor();
    </p>
    <p>
    Returns the maximum color index for the current operating mode of the adapter. The minimum index is always 0. Therefore, it returns the number of available colors minus 1.
    </p>
    <p>
    
    </p>
    <p>
    -getmaxx();
    </p>
    <p>
    This function is used to obtain the maximum screen coordinate in the horizontal direction. This value is usually the maximum horizontal resolution minus 1 = 639. The function <strong>getmaxx </strong>returns the maximum screen coordinate in the horizontal direction.
    </p>
    <p>
    -getmaxy();
    </p>
    <p>
    This function is used to obtain the maximum screen coordinate in the vertical direction. This value is usually the maximum vertical resolution minus 1 = 479. The function <strong>getmaxy </strong>returns the maximum screen coordinate in the vertical direction.
    </p>
    <p>
    <strong><em>e.g.</em></strong>
    </p>
    <p>
    #include &lt;stdlib.h>
    </p>
    <p>
    #include &lt;conio.h>
    </p>
    <p>
    #include &lt;graphics.h>
    </p>
    <p>
    #include &lt;stdio.h>
    </p>
    <p>
    void main (void)
    </p>
    <p>
    {
    </p>
    <p>
    int adap=DETECT, mode, x_max,y_max;
    </p>
    <p>
    initgraph(&adap,&mode,"C:\\tc20\\bin ");
    </p>
    <p>
    cleardevice();
    </p>
    <p>
    x_max=<strong>getmaxx();</strong>
    </p>
    <p>
    y_max=<strong>getmaxy();</strong>
    </p>
    <p>
    closegraph();
    </p>
    <p>
    printf("maximum x :%d\tmaximum y:%d\n",x_max,y_max);
    </p>
    <p>
    getch();
    </p>
    <p>
    }
    </p>
    <p>
    <strong>Graphic Functions for Drawing Geometric Figures</strong>
    </p>
    <p>
    -putpixel (int x, int y, int col);
    </p>
    <p>
    Draws a pixel (dot) at position (x, y) with the color col. The pixel is the smallest area of the screen that can be controlled.
    </p>
    <p>
    -line(int x1, int y1, int x2, int y2);
    </p>
    <p>
    Draws a line from (x1, y1) to (x2, y2) using the color set by setcolor and the line pattern and thickness set by setlinestyle.
    </p>
    <p>
    -rectangle(int x1, int y1, int x2, int y2);
    </p>
    <p>
    Draws a rectangle with the top left corner at (x1, y1) and the bottom right corner at (x2, y2) using the color set by setcolor and the line pattern and thickness set by setlinestyle.
    </p>
    <p>
    -circle (int x, int y, int rad);
    </p>
    <p>
    Draws a circle with center (x, y) and radius rad using the color set by setcolor and line thickness set by setlinestyle.
    </p>
    <p>
    -void arc (int x, int y, int ang1, int ang2, int rad);
    </p>
    <p>
    Draws an arc with center (x, y), starting angle (in degrees) ang1, ending angle (in degrees) ang2, and radius rad, using the current color and line thickness set by setlinestyle.
    </p>
    <p>
    -void ellipse (int x, int y, int ang1, int ang2, int radx, int rady);
    </p>
    <p>
    Draws an elliptical arc with center at (x, y), starting angle (in degrees) ang1, ending angle (in degrees) ang2, horizontal radius radx, and vertical radius rady, using the current color set by setcolor and line thickness set by setlinestyle.
    </p>
    <p>
    
    </p>
    <p>
    drawpoly (int points, int *vertices);
    </p>
    <p>
    Draws a polyline (a figure of connected line segments) with <strong>n</strong>points vertices using the current color set by setcolor and the line pattern and thickness set by setlinestyle.
    </p>
    <p>
    The coordinates of the vertices are in the array vertices, which has (2 * npoints) elements ordered as follows: x1, y1, x2, y2, . . . xn, yn. It draws from (x1, y1) to (x2, y2), from (x2, y2) to (x3, y3), and so on until (xn-1, yn-1) to (xn, yn). The first point must be repeated at the end of the list to close the figure.
    </p>
""")
        if created:
            print("The topic 4 was created successfully.")
        else:
            print("The topic 4 already exists.")
    
    
        topic5, created = Topics.objects.get_or_create(unit=unit2, name="""<p><em>Topic 5 - Graphic Interaction Techniques</em></p>""", content="""<p>
        We can make some types of user interaction with the things on screen using functions built in the graphics.h library.
    </p>
    <p>
    <strong>RasterOp</strong>
    </p>
    <p>
    <strong>	RasterOp</strong> is the operation of transferring rectangular blocks of pixels, called rasters. Rasterop stands for "raster operation". It is also called "<strong>Bitblt</strong>" for bit block transfer.
    </p>
    <p>
    The rasters that <strong>rasterop</strong> transfers can be in video memory or in a buffer in RAM.
    </p>
    <p>
    <strong>	</strong>In addition to copying a raster, <strong>rasterop</strong> can combine two rasters using logical operations such as <strong>XOR</strong>, <strong>OR</strong>, etc. 
    </p>
    <p>
    <strong>Rasterop</strong> is used to save, insert, copy, relocate, and combine image pieces using logical operations. 
    </p>
    <p>
    <em>It also enables many new techniques in animation and image construction.</em>
    </p>
    <p>
    <em>	</em>
    </p>
    <p>
    <em>The utility of <strong>rasterop</strong> lies in enabling the manipulation of a block of pixels, an operation that has no analogy in geometry. </em>
    </p>
    <p>
    <em>This is because a raster is a graphic object that lacks geometric description. The description of a raster includes both its dimensions and the colors of all the pixels it contains.</em>
    </p>
    <p>
    <em>However, logical modes of operation, beyond merely copying rasters, as in cut and paste operations, enable a wide variety of effects. In the field of computer graphics, the <strong>rasterop</strong> operation is considered one of the fundamental primitives.</em>
    </p>
    <p>
    <strong>Use of RasterOp</strong>
    </p>
    <p>
    To use <strong>rasterop</strong>, you typically first obtain a dynamic memory buffer using the imagesize function to determine the required size. Then, you call getimage to copy from the screen to the buffer, and finally call putimage to copy from the buffer to the screen.
    </p>
    <p>
    -int imagesize (int izq, int sup, int der, int inf);
    </p>
    <p>
    Returns the size in bytes of the buffer required to save a raster with the top-left corner at (left, top) and the bottom-right corner at (right, bottom). 
    </p>
    <p>
    <strong><em>This size can be passed to the malloc function to request a block of dynamic memory.</em></strong>
    </p>
    <p>
    The buffer size varies with the number of bits per pixel in the current mode and includes a header that C uses to store the dimensions of the stored raster. It returns a negative value if the raster is too large.
    </p>
    <p>
    <em>Is important to note that this depends on the IDE that's being used, and the C language version.</em>
    </p>
    <p>
    <em>- void getimage (int izq, int sup, int der, int inf, void *buf);</em>
    </p>
    <p>
    Copies the raster from the screen with the top-left corner at (left, top) and the bottom-right corner at (right, bottom) to the buffer pointed to by <strong>buf</strong>. 
    </p>
    <p>
    <strong><em>The buffer must be large enough to store the entire raster.</em></strong>
    </p>
    <p>
    -void putimage (int izq, int sup, void *buf, int op);
    </p>
    <p>
    Copies the raster currently stored in the buffer pointed to by <strong>buf</strong> to the screen, placing its top-left corner at (left, top). 
    </p>
    <p>
    The dimensions of the raster are already stored in the buffer, having been placed there during the raster read operation with getimage.
    </p>
    <p>
    The <strong>op</strong> parameter selects the logical operation mode, such as OR (disjunction), which combines the pixels of the source raster with the pixels of the destination raster. The predefined values for this parameter are listed in the table below:
    </p>
    <ul>
    
    <li>COPY_PUT: Copies the raster directly to the screen.
    
    <li>XOR_PUT: XOR (exclusive OR) of the raster with the screen.
    
    <li>OR_PUT: Disjunction (OR) of the raster with the screen.
    
    <li>AND_PUT: Conjunction (AND) of the raster with the screen.
    
    <li>NOT_PUT: Copies the complement of the raster to the screen.
    </li>
    </ul>
    <p>
    <strong><em>It doesn't matter what the previous content of the screen is.</em></strong>
    </p>
""")
        if created:
            print("The topic 5 was created successfully.")
        else:
            print("The topic 5 already exists.")
    
    
    
    def insert_unit_3_full():
        unit3, created = Units.objects.get_or_create(level=3, name="Unit 3. Polygon Triangulation.", description="This is the third unit.")
        if created:
            print("The unit 3 was created successfully.")
        else:
            print("The unit 3 already exists.")
        
        topic1, created = Topics.objects.get_or_create(unit=unit3, name="""<p><em>Topic 1 - Art Gallery theorem.</em></p>""", content="""
        <p>
    <em>	</em>Polygon triangulation involves taking a simple polygon (a closed shape with straight edges that doesn't intersect itself) and cutting it up into a bunch of triangles.
    </p>
    <p>
     
    </p>
    <p>
    Polygons can be made in a lot of shapes or “classes”; the objective of polygon triangulation is to reduce the complex shape to multiple simple ones.
    </p>
    <p>
    Some things to note when doing triangulation:
    </p>
    <p>
    <em>Every simple polygon admits a triangulation.</em>
    </p>
    <p>
    <em>Every triangulation of an n-gon has exactly n − 2 triangles.</em>
    </p>
    <p>
        
    </p>
    <p>
    Going into the subject of the art gallery problem, Imagine an art gallery represented by a polygon with <strong>n</strong> vertices. You need to place guards at some of these vertices so that every point inside the polygon is visible to at least one guard.
    </p>
    <p>
         A gallery is, of course, a 3-dimensional space, but a floor plan gives us enough information to place the cameras. Therefore we model a gallery as a polygonal region in the plane.
    </p>
    <p>
        We further restrict ourselves to regions that are simple polygons. These regions are enclosed by a single closed polygonal chain that does not intersect itself. Thus, we do not allow regions with holes. 
    </p>
    <p>
    A camera position in the gallery corresponds to a point in the polygon. A camera sees those points in the polygon to which it can be connected with an open segment that lies in the interior of the polygon.
    </p>
    <p>
        The number of cameras needed to guard a simple polygon varies with the polygon's complexity: more complex shapes require more cameras. Therefore, we express the upper bound on the required cameras in terms of nn, the number of vertices in the polygon. 
    </p>
    <p>
    <strong><em>It's important to note that even polygons with the same number of vertices may differ in how easily they can be guarded.</em></strong>
    </p>
    <p>
        A convex polygon, for example, can always be guarded with one camera. To be on the safe side we shall look at the worst-case scenario, that is, we shall give a bound that is good for any simple polygon with n vertices.
    </p>
    <p>
    
    </p>
    <p>
    Let <strong>P</strong> be a simple polygon with<strong> n</strong> vertices. Because <strong>P</strong> may be a complicated shape, it seems difficult to say anything about the number of cameras we need to guard<strong> P</strong>. Hence, we first decompose <strong>P</strong> into pieces that are easy to guard, namely triangles. 
    </p>
    <p>
    We do this by drawing diagonals between pairs of vertices.
    </p>
    <p>
        An open line segment connecting two vertices of a polygon <strong>P</strong> and lying entirely within its interior is called a diagonal. Triangulations of a polygon are typically not unique.
    </p>
        """)
        if created:
            print("The topic 1 was created successfully.")
        else:
            print("The topic 1 already exists.")

        topic2, created = Topics.objects.get_or_create(unit=unit3, name="""<p><em>Topic 2 - Theory of triangulation.</em></p>""", content="""<p>
    <em>	</em>For organizing the collection of triangles in a triangulation and to make triangulations easy to handle, it is necessary to impose certain restrictions. More precisely, we must enforce restrictions so that a <strong>triangulation <em>A</em></strong> becomes a subdivision of a domain into a collection of connected non-overlapping triangles. 
    </p>
    <p>
    The triangles of a triangulation are formed by points given in the domain of interest. These points can either be given or selected by some suitable procedure.
    </p>
    <p>
    In most cases when constructing triangulations, we start with a given collection of points, say
    </p>
    <p>
    P= {pi}, i=1, ..., N,
    </p>
    <p>
    and <strong>a domain <em>?</em></strong>, which contains all the points in<strong> P</strong>. We assume that the boundary of 2 is one or more closed simple polygons. <em>A simple polygon is a polygon that does not self-intersect.</em>
    </p>""")
        if created:
            print("The topic 2 was created successfully.")
        else:
            print("The topic 2 already exists.")


if __name__ == "__main__":
    print("This is a helper file to insert the units and topics")