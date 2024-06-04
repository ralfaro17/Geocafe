from django.contrib.auth.models import User
from course.models import Units, Topics, Badges, UserProgress


class Insertions:
    def insert_unit_1():
        unit, created = Units.objects.get_or_create(level=1, name="# Introduction to computational geometry.", description="This is the first unit.")
        if created:
            print("The unit was created successfully.")
        else:
            print("The unit already exists.")
    
    # def insert_topics_unit_1():
    #     try:
    #         unit = Units.objects.get(level=1)
    #     except:
    #         print("The unit 1 does not exist.")
    
    def insert_topic_1_unit_1():
        unit, created = Units.objects.get_or_create(level=1, name="# Introduction to computational geometry.", description="This is the first unit.")
        if created:
            print("The unit was created successfully.")
        else:
            print("The unit already exists.")
    
        topic, created = Topics.objects.get_or_create(unit=unit, name="### What is computational geometry?", content="""It’s referred to as a field of **computer science and geometry**, having the main function of designing and analyzing computer algorithms related to solving geometric problems.

Modern computational geometry can be used as a way to solve two and three dimensional problems, but the term is mostly used in the context of two dimensions, and that's the one we will oblige in this course.

We can make a direct connection between computer science as there are many fields of computer science that deal with solving problems of a geometric nature. These include computer graphics, robotics, and geographic information systems (GIS). 

To address this challenge, computational geometry swoops in, offering a toolbox of fundamental geometric solutions that these applications can leverage to build their programs.

**_Given our specific case of study we will try to center this course in the computer graphics field, looking for a smooth and accessible learning for most people._**
""", level=1)
        if created:
            print("The topic was created successfully.")
        else:
            print("The topic already exists.")
    
    def insert_topic_2_unit_1():
        unit, created = Units.objects.get_or_create(level=1, name="# Introduction to computational geometry.", description="This is the first unit.")
        if created:
            print("The unit was created successfully.")
        else:
            print("The unit already exists.")
    
        topic, created = Topics.objects.get_or_create(unit=unit, name="### Application areas.", content="""Computational geometry is a field that has been around for a long time, and it has been used in a variety of applications.""")

Insertions.insert_topic_1_unit_1

if __name__ == "__main__":
    print("This is a helper file to insert the units and topics")