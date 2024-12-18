<%@page import="com.codezoo.data.DAO.ConceptsDAO"%>
<%@page import="com.codezoo.Helper.UUIDGenerator"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<%@page 
	import="com.codezoo.data.JDO.PerformanceAnalyzerJDO"
	import="com.codezoo.data.DAO.PerformanceAnalyzerDAO"
%>

<%
	PerformanceAnalyzerJDO objPerformanceAnalyzerJDO = new PerformanceAnalyzerJDO();
	//Swap Algorithm
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=10, B=20, C=30.         	A->B->C->A.      after swapping what will be the  C value ?", "10", "20", "30", "0", "20");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=50,  B=20.                               A->B->A.                after swapping what will be the B  value?", "30", "20", "50", "70", "50");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=10,  B=20,  C=40.                     A<-B<-C<-A.           what will be the A value?", "10", "70", "40", "20", "20");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=1,   B=2,  C=3,  D=4.             A->B->C->D->A.         what will be the C value?", "2", "1", "4", "3", "2");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=1,   B=2,   C=3,  D=4.            A<-B<-C<-D<-A.         what will be the B value?", "3", "2", "1", "4", "2");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=true,  B=false,  C=not equal.   A->B->C->D->E->A,   A<-B<-C<-D<-E<-A  What is the relatition between these equations?", "Equal", "Not equal", "No Idea", "None of the above", "Equal");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "Is it possible to Swap two values without using the third variable?", "May be", "Not Possible", "Possible", "None of the above", "Possible");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "Is it possible to Swap two characters?", "Not Possible", "Sometimes possible", "Possible", "None of the above", "Not Possible");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "Two glasses namely A,B contains milk,water respectively. How will you change them?", "Move A to C & B to A", "Move C to A & A to B", "Move B to A & A to B & B to C", "Move A to C & B to A & C to B", "Move A to C & B to A & C to B");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_001", "A=5    B=10 How will you Swap them without using third variable?", "A=B+A & A=A-A & B=A-A", "B=A+B & B=A-A", "A=A-B & B=B+A & A=A+A", "A=A+B & B=A-B & A=A-B", "A=A+B & B=A-B & A=A-B");
	
	//Fibonacci Series Algorithm
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Find the last element 0/1 1/5 1/4 1/3 2/5 1/2  ?", "2/3", "3/5", "4/5", "3/4", "3/5");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Given a=0, b=1, c=1 are the first three numbers of the sequence. Find the first three elements?", "2,4,7", "3,5,8", "2,5,8", "3,8,13", "2,4,7");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "To calculate the nth Fibonacci number , how many steps are required?", "2logn", "2lognx", "log2n", "logn", "log2n");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Which of the following is not a Fibonacci Sequence ?", "0, 1, 1, 2, 3, 50", "1, 3, 4, 7, 11, 180", "1, 2, 4, 8, 15, 210", "None of the above", "1, 2, 4, 8, 15, 210");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "What would be the next element for the following series 1! +0!, 2!+1!, 3!+2!...  ?", "4!+5!", "3!+4!", "4!+3!", "3!+3!", "4!+3!");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Which of the following is not an application area of Fibonacci sequence ?", "electrical network", "zoology", "option a not b", "option b not a", "option b not a");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Which of the following things are application area of Fibonacci ?", "botany", "sorting and searching", "both a and b", "none of the above", "both a and b");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Efficiency of the Fibonacci sequence?", "n power 2", "2 power n", "log2n", "2nlog", "log2n");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "new term=?", "current term+2", "preceding term + term before preceding term", "current term + preceding term", "current term*2", "preceding term +  term before preceding term");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_002", "Fill in the blank: Each term beyond the first two is derived from the sum of its two nearest------------- ?", "predecessors", "successors", "followers", "statement is wrong", "predecessors");
	
	//Triangular Series Algorithm
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "What is the next value of this series 1, 3, 6, 10, 15, 21, 28, 36,... ?", "46", "45", "51", "64", "45");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "What is the formula to find the nth value of the series?", "n/2", "n(n+1)", "n(n+1)/2", "2n+1", "n(n+1)/2");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "Fill in the blanks. 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, -, 91", "78", "87", "81", "69", "78");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "What is the 26th element of the Triangular series?", "300", "347", "325", "351", "351");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "Does 5050 is the 100th element of the Triangular series?", "No", "Yes", "May be", "None ofthe above", "Yes");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "How many dots will be there in 7th element's triange of the Triangular series?", "0 Dots", "14 Dots", "28 Dots", "35 Dots", "28 Dots");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "Next term of Triangular series = ?", "Current term + (n+1)", "Current term + 2", "Preceding term + term before preceding term", "Current term + Next term of the Numerical series", "Current term + Next term of the Numerical series");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "(a) Dots of the 1th element of the series can make proper triangle. (b) Dots of the 3rd element of the series can make proper triangle. Which of the above statement is wrong?", "both a and b", "a", "b", "None of the above", "a");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "0, 1, 1, 2, 3, 5, 8... Is this a proper triangular series?", "Yes", "May be", "May not be", "No", "No");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_003", "In Triangular series, what will be difference between nth term and (n+1)th term?", "n", "n-1", "n+1", "(n+1)/2", "(n+1)");
	
	//Sort Algorithm
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "Two main measures for the efficiency of an algorithm are", "Processor and memory", "Complexity and capacity", "Time and space", "Data and space ", "Time and space");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "The time factor when determining the efficiency of algorithm is measured by", "Counting microseconds", "Counting the number of key operations", "Counting the number of statements", "Counting the kilobytes of algorithm", "Counting the number of key operations");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "Which of the following case does not exist in complexity theory", "Best case", "Worst case", "Average case", "Null case", "Null case");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "The complexity of the average case of an algorithm is", "Much more complicated to analyze than that of worst case", "Much more simpler to analyze than that of worst case", "Sometimes more complicated and some other times simpler than that of worst case", "None or above", "Much more complicated to analyze than that of worst case");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "The complexity of Bubble sort algorithm is", "O(n)", "O(log n)", "O(n2)", "O(n log n)", "O(n2)");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "The complexity of merge sort algorithm is", "O(n)", "O(log n)", "O(n2)", "O(n log n)", "O(n log n)");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "The indirect change of the values of a variable in one module by another module is called", "internal change", "inter-module change", "side effect", "side-module update", "side effect");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "The operation of processing each element in the list is known as", "Sorting", "Merging", "Inserting", "Traversal", "Traversal");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "In the sort, file is divided into subfiles which are to be independently sorted and merged.", "Quick sort", "Heap sort", "Bubble sort", "None of these", "Quick sort");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_004", "This sort inserts each element A(K) into its proper position in the previously sorted subarray ( A(1).....,A(K-1) ).", "Insertion sort", "Radix sort", "Merge sort", "Bubble sort", "Insertion sort");
	
	//Search Algorithm
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "This searching method requires that all keys must reside in internal memory.", "Binary Search", "Sequential Search", "Hashing", "None of these", "Binary Search");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "Which of the following searching methods is good and fast?", "Sequential Search", "Binary Search", "Index Search", "None of the above", "Index Search");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "Which of the following searching methods is good and fast?", "Dead Fast Search", "Depth First Search", "No Expansion", "None of the above", "Depth First Search");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "What does BFS stands for?", "Breadth Fast Search", "Breathe First Search", "Breadth First Search", "None of the above", "Breadth First Search");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "Where do we use DFS and BFS?", "File", "Web", "Map", "Graph", "Graph");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "Which of the following search uses \"Divide and Conquer\".", "Index search", "Sequential search", "Binary search", "None of the above", "Binary search");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "Which of the following search is applicable for only sorted list?", "Index search", "Sequential search", "Binary search", "None of the above", "Binary search");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "The list of elemets are given below find out how many times the item occur.   7   7   5   34   65   89    67    43   34.  The item is 34.", "1", "2", "3", "4", "2");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "The list of elemets are given below find out whether the given item is available are not?   7   7   5   34   65   349    89    67    43   34.  The item is 349.", "Not Available", "Available", "May be", "No Idea", "Available");
	PerformanceAnalyzerDAO.setPerformanceAnalyzerProperties("cp_005", "Which of the searching method would be efficient to find the item 20 in the list...      5   10    15    20    25   30    35    40    45     50.", "Index search", "Sequential search", "Binary search", "None of the above", "Binary search");
%>

</head>
<body>
	Values are persisted
</body>
</html>