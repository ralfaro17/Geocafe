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


if __name__ == "__main__":
    print("This is a helper file to insert the units and topics")