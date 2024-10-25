import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PowerOfTwoMaxHeap {
    private final List<Integer> heap;
    private final int childrenFactor;

    // Constructor where childFactor is 2^levelOfChildren
    public PowerOfTwoMaxHeap(int levelOfChildren) {
        this.heap = new ArrayList<>();
        this.childrenFactor = (int) Math.pow(2, levelOfChildren);
    }

    // Insert a new element into the heap
    public void insert(int value) {
        heap.add(value);
        siftUp(heap.size() - 1);
    }

    // Pop the maximum element from the heap
    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty.");
        }

        int maxValue = heap.get(0);
        int lastValue = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, lastValue);
            siftDown(0);
        }

        return maxValue;
    }

    // Sift up to maintain the heap property after insertion
    private void siftUp(int index) {
        int parentIndex = (index - 1) / childrenFactor;
        while (index > 0 && heap.get(index) > heap.get(parentIndex)) {
            Collections.swap(heap, index, parentIndex);
            index = parentIndex;
            parentIndex = (index - 1) / childrenFactor;
        }
    }

    // Sift down to maintain the heap property after pop
    private void siftDown(int index) {
        int size = heap.size();
        while (true) {
            int maxIndex = index;
            int firstChildIndex = childrenFactor * index + 1;

            // Check each child to find the maximum
            for (int i = 0; i < childrenFactor; i++) {
                int currentChildIndex = firstChildIndex + i;
                if (currentChildIndex < size && heap.get(currentChildIndex) > heap.get(maxIndex)) {
                    maxIndex = currentChildIndex;
                }
            }

            // If maxIndex did not change, heap property is satisfied
            if (maxIndex == index) {
                break;
            }

            // Swap with the largest child and continue sifting down
            Collections.swap(heap, index, maxIndex);
            index = maxIndex;
        }
    }

    // Utility method to print the heap
    public void printHeap() {
        System.out.println(heap);
    }

    // Main method for testing the implementation
    public static void main(String[] args) {
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(1); // 2^1 = 2 children

        // Test inserting elements
        heap.insert(10);
        heap.insert(20);
        heap.insert(5);
        heap.insert(30);
        heap.insert(40);
        heap.insert(25);

        // Print heap after insertion
        System.out.println("Heap after insertions:");
        heap.printHeap();

        // Test popping max elements
        System.out.println("Popped max: " + heap.popMax());
        System.out.println("Heap after popping max:");
        heap.printHeap();
    }
}
